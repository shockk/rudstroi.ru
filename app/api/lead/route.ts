import { NextResponse } from 'next/server';

// Обработчик заявок с сайта: проверяет данные и отправляет уведомление в Telegram.
// Секреты берутся из переменных окружения (локально .env.local, на сервере — панель Timeweb).

const LIMITS = { short: 100, phone: 30, comment: 2000 };
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

// Простое ограничение частоты по IP (в памяти процесса — достаточно для одного инстанса)
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  // Ловушка для ботов: делаем вид, что всё хорошо
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'too_many_requests' }, { status: 429 });
  }

  const lead = {
    service: str(body.service, LIMITS.short),
    area: str(body.area, LIMITS.short),
    place: str(body.place, LIMITS.short),
    name: str(body.name, LIMITS.short),
    phone: str(body.phone, LIMITS.phone),
    comment: str(body.comment, LIMITS.comment),
    page: str(body.page, LIMITS.short),
  };

  if (lead.phone.replace(/\D/g, '').length < 10) {
    return NextResponse.json({ ok: false, error: 'phone_required' }, { status: 422 });
  }
  if (!body.consent) {
    return NextResponse.json({ ok: false, error: 'consent_required' }, { status: 422 });
  }

  const lines = [
    '<b>Новая заявка с сайта</b>',
    lead.service && `Услуга: ${escapeHtml(lead.service)}`,
    lead.area && `Площадь / объём: ${escapeHtml(lead.area)}`,
    lead.place && `Где: ${escapeHtml(lead.place)}`,
    lead.name && `Имя: ${escapeHtml(lead.name)}`,
    `Телефон: ${escapeHtml(lead.phone)}`,
    lead.comment && `Комментарий: ${escapeHtml(lead.comment)}`,
    lead.page && `Страница: ${escapeHtml(lead.page)}`,
  ].filter(Boolean);

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[lead] Telegram не настроен, заявка:\n' + lines.join('\n'));
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error('[lead] TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы');
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 500 });
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: lines.join('\n'), parse_mode: 'HTML' }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error('[lead] Telegram ответил', res.status, await res.text());
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
    }
  } catch (err) {
    console.error('[lead] Ошибка отправки в Telegram', err);
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
