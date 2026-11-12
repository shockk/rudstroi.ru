import Link from 'next/link';
import { nav, site } from '@/data/site';
import { Logo } from './Logo';
import styles from './Header.module.css';

export function Header() {
  return (
    <>
      <div className={styles.topbar}>
        <div className={`container ${styles.topbarInner}`}>
          <span>{site.cities.join(' · ')}</span>
          <span>{site.hours} · Выезд замерщика бесплатно</span>
        </div>
      </div>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          <Logo />
          <nav className={styles.nav}>
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <a className={styles.phone} href={site.phoneHref}>
            <strong>{site.phone}</strong>
            <small>{site.callbackPromise}</small>
          </a>
          <Link className={`btn btn-accent ${styles.cta}`} href="/#zayavka">
            Заявка
          </Link>
        </div>
      </header>
    </>
  );
}
