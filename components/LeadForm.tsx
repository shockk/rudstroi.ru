'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './LeadForm.module.css';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function LeadForm({ services, defaultService }: { services: string[]; defaultService?: string }) {
  const [service, setService] = useState(defaultService ?? services[0]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const digits = (data.phone ?? '').replace(/\D/g, '');
    if (digits.length < 10) {
      setError('Укажите телефон, чтобы мы могли перезвонить');
      return;
    }
    if (!data.consent) {
      setError('Нужно согласие на обработку персональных данных');
      return;
    }

    setError('');
    setStatus('sending');
    try {
      const res = await fetch('/api/lead/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, service, page: window.location.pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className={`${styles.form} ${styles.done}`}>
        <div className={styles.doneIcon}>✓</div>
        <h3>Заявка отправлена</h3>
        <p>Перезвоним в ближайшее время, обычно в течение 15 минут в рабочее время.</p>
        <button type="button" className={styles.link} onClick={() => setStatus('idle')}>
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <h3>Что нужно сделать?</h3>
      <div className={styles.opts} role="radiogroup" aria-label="Услуга">
        {services.map((s) => (
          <button
            type="button"
            key={s}
            role="radio"
            aria-checked={service === s}
            className={`${styles.opt} ${service === s ? styles.sel : ''}`}
            onClick={() => setService(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className={styles.row}>
        <input className={styles.field} name="area" placeholder="Площадь или объём, например 120 м²" maxLength={100} />
        <input className={styles.field} name="place" placeholder="Город или посёлок" maxLength={100} />
      </div>
      <div className={styles.row}>
        <input className={styles.field} name="name" placeholder="Как к вам обращаться" maxLength={100} autoComplete="name" />
        <input
          className={styles.field}
          name="phone"
          type="tel"
          placeholder="Телефон *"
          maxLength={30}
          autoComplete="tel"
          required
          onChange={() => error && setError('')}
        />
      </div>
      <textarea className={styles.field} name="comment" placeholder="Комментарий" rows={3} maxLength={2000} />

      {/* Ловушка для ботов: поле скрыто от людей */}
      <input className={styles.hp} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <label className={styles.consent}>
        <input type="checkbox" name="consent" defaultChecked onChange={() => error && setError('')} />
        <span>
          Согласен на обработку персональных данных в соответствии с <Link href="/privacy/">политикой</Link>
        </span>
      </label>

      {error && <p className={styles.error}>{error}</p>}
      {status === 'error' && (
        <p className={styles.error}>Не получилось отправить заявку. Позвоните нам или попробуйте ещё раз.</p>
      )}

      <button className={`btn btn-accent ${styles.submit}`} disabled={status === 'sending'}>
        {status === 'sending' ? 'Отправляем…' : 'Получить расчёт'}
      </button>
    </form>
  );
}
