import Link from 'next/link';
import { site } from '@/data/site';
import styles from './Logo.module.css';

export function Logo({ size = 'md' }: { size?: 'md' | 'sm' }) {
  return (
    <Link href="/" className={`${styles.logo} ${size === 'sm' ? styles.sm : ''}`} aria-label={site.name}>
      {site.logo.first}
      <span className={styles.second}>{site.logo.second}</span>
    </Link>
  );
}
