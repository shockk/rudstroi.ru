import Image from 'next/image';
import { works } from '@/data/home';
import styles from './Works.module.css';

export function Works() {
  return (
    <section className="section" id="raboty">
      <div className="container">
        <div className="eyebrow">Наши работы</div>
        <h2 className="h2">Участки наших клиентов</h2>
        <div className={styles.grid}>
          {works.map((w, i) => (
            <figure key={w.title} className={styles.work}>
              <Image src={w.image} alt={w.title} fill sizes={i === 0 ? '(max-width: 900px) 100vw, 780px' : '(max-width: 900px) 100vw, 400px'} />
              <figcaption>
                <strong>{w.title}</strong>
                <span>{w.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
