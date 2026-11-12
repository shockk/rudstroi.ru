'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './LeadForm.module.css';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function LeadForm({ services, defaultService }: { services: string[]; defaultService?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const digits = (data.phone ?? '').replace(/\D/g, '');
    if (digits.length < 10) {
      setError('Укажите телефон, чтобы мы могли перезвонить');
      form.querySelector<HTMLInputElement>('[name=phone]')?.focus();
      return;
    }
    if (!data.consent) {
      setError('Отметьте согласие на обработку персональных данных');
      return;
    }

    setError('');
    setStatus('sending');
    try {
      const res = await fetch('/api/lead/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, page: window.location.pathname }),
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

  const clearError = () => error && setError('');

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <h3>Оставьте телефон — перезвоним</h3>

      {/* Телефон — единственное обязательное поле, поэтому он первый */}
      <label className={styles.label}>
        Телефон
        <input
          className={`${styles.field} ${styles.phone}`}
          name="phone"
          type="tel"
          inputMode="tel"
          placeholder="+7 900 000-00-00"
          maxLength={30}
          autoComplete="tel"
          required
          onChange={clearError}
        />
      </label>

      <label className={styles.label}>
        Что нужно сделать
        <select className={styles.field} name="service" defaultValue={defaultService ?? ''}>
          <option value="">Пока не знаю, нужна консультация</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.row}>
        <label className={styles.label}>
          Как к вам обращаться
          <input className={styles.field} name="name" placeholder="Имя" maxLength={100} autoComplete="name" />
        </label>
        <label className={styles.label}>
          Город или посёлок
          <input className={styles.field} name="place" placeholder="Истра" maxLength={100} />
        </label>
      </div>

      <label className={styles.label}>
        Комментарий
        <textarea
          className={styles.field}
          name="comment"
          placeholder="Площадь, объём, пожелания — если уже знаете"
          rows={2}
          maxLength={2000}
        />
      </label>

      {/* Ловушка для ботов: поле скрыто от людей */}
      <input className={styles.hp} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {/* Согласие человек отмечает сам (152-ФЗ) — галочка по умолчанию не стоит */}
      <label className={styles.consent}>
        <input type="checkbox" name="consent" onChange={clearError} />
        <span>
          Согласен на обработку персональных данных в соответствии с <Link href="/privacy/">политикой</Link>
        </span>
      </label>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      {status === 'error' && (
        <p className={styles.error} role="alert">
          Не получилось отправить заявку. Позвоните нам или попробуйте ещё раз.
        </p>
      )}

      <button className={`btn btn-accent ${styles.submit}`} disabled={status === 'sending'}>
        {status === 'sending' ? 'Отправляем…' : 'Получить расчёт'}
      </button>
    </form>
  );
}
