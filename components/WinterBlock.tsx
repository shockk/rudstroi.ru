import Image from 'next/image';
import Link from 'next/link';
import { winterBlock } from '@/data/home';
import styles from './WinterBlock.module.css';

export function WinterBlock() {
  return (
    <section className={`section ${styles.section}`} id="zima">
      <div className="container">
        <div className={styles.box}>
          <div className={styles.img}>
            <Image src={winterBlock.image} alt="Уборка снега" fill sizes="(max-width: 900px) 100vw, 600px" />
          </div>
          <div className={styles.body}>
            <div className="eyebrow">Зима</div>
            <h2 className={`h2 ${styles.title}`}>{winterBlock.title}</h2>
            <ul>
              {winterBlock.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <Link className="btn btn-accent" href="/#zayavka">
              {winterBlock.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
