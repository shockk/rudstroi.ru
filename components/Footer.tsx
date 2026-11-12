import { site } from '@/data/site';
import { Logo } from './Logo';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <Logo size="sm" />
          <p>{site.tagline}</p>
        </div>
        <div className={styles.right}>
          <p>{site.cities.join(' · ')}</p>
          <a href={site.phoneHref}>{site.phone}</a>
          <br />
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>
    </footer>
  );
}
