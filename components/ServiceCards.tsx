import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/data/services';
import styles from './ServiceCards.module.css';

export function ServiceCards({ items }: { items: Service[] }) {
  return (
    <div className={styles.grid}>
      {items.map((s) => (
        <Link key={s.slug} href={`/uslugi/${s.slug}/`} className={styles.card}>
          <div className={styles.img}>
            <Image src={s.image} alt={s.title} fill sizes="(max-width: 900px) 100vw, 400px" />
          </div>
          <div className={styles.body}>
            <h3>{s.title}</h3>
            <p>{s.short}</p>
            <span className={styles.more}>Подробнее</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
