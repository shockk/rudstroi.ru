'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './MobileMenu.module.css';

type Item = { href: string; label: string };

export function MobileMenu({ items, phone, phoneHref }: { items: Item[]; phone: string; phoneHref: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`${styles.burger} ${open ? styles.open : ''}`}
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <nav id="mobile-menu" className={styles.panel}>
          {items.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <a href={phoneHref} className={styles.phone}>
            {phone}
          </a>
          <Link href="/#zayavka" className={`btn btn-accent ${styles.cta}`} onClick={() => setOpen(false)}>
            Оставить заявку
          </Link>
        </nav>
      )}
    </>
  );
}
