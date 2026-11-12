'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import type { Photo } from '@/data/services';
import styles from './Gallery.module.css';

export function Gallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? null : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, step]);

  const current = open === null ? null : photos[open];

  return (
    <>
      <div className={styles.grid}>
        {photos.map((p, i) => (
          <button key={p.src} type="button" className={styles.item} onClick={() => setOpen(i)} aria-label={`Открыть фото: ${p.alt}`}>
            <Image src={p.src} alt={p.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1000px) 33vw, 290px" />
            {p.caption && <span className={styles.caption}>{p.caption}</span>}
          </button>
        ))}
      </div>

      {current && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={current.alt} onClick={close}>
          <div className={styles.frame} onClick={(e) => e.stopPropagation()}>
            <Image src={current.src} alt={current.alt} fill sizes="100vw" className={styles.full} />
          </div>
          {current.caption && <p className={styles.fullCaption}>{current.caption}</p>}
          <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={(e) => (e.stopPropagation(), step(-1))} aria-label="Предыдущее фото">
            ‹
          </button>
          <button type="button" className={`${styles.nav} ${styles.next}`} onClick={(e) => (e.stopPropagation(), step(1))} aria-label="Следующее фото">
            ›
          </button>
          <button type="button" className={styles.close} onClick={close} aria-label="Закрыть">
            ×
          </button>
        </div>
      )}
    </>
  );
}
