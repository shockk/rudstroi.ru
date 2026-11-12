import Link from 'next/link';
import { nav, site } from '@/data/site';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
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
          <a className={styles.phone} href={site.phoneHref} aria-label={`Позвонить: ${site.phone}`}>
            <svg className={styles.phoneIcon} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
            </svg>
            <strong>{site.phone}</strong>
            <small>{site.callbackPromise}</small>
          </a>
          <Link className={`btn btn-accent ${styles.cta}`} href="/#zayavka">
            Заявка
          </Link>
          <MobileMenu items={nav} phone={site.phone} phoneHref={site.phoneHref} />
        </div>
      </header>
    </>
  );
}
