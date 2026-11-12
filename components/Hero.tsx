import Image from 'next/image';
import Link from 'next/link';
import { heroes } from '@/data/home';
import { site } from '@/data/site';
import styles from './Hero.module.css';

export function Hero({ season }: { season: 'summer' | 'winter' }) {
  const hero = heroes[season];
  return (
    <section className={styles.hero}>
      <Image src={hero.image} alt="" fill priority sizes="100vw" className={styles.bg} />
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <span className={styles.tag}>{hero.tag}</span>
          <h1>{hero.title}</h1>
          <p>{hero.text}</p>
          <div className={styles.actions}>
            <Link className="btn btn-accent" href="/#zayavka">
              {hero.cta}
            </Link>
            <Link className="btn btn-ghost" href="/#raboty">
              Смотреть работы
            </Link>
          </div>
          <div className={styles.stats}>
            {site.stats.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
