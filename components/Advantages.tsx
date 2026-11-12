import { advantages } from '@/data/home';
import styles from './Advantages.module.css';

export function Advantages() {
  return (
    <section className={`section ${styles.why}`}>
      <div className="container">
        <div className={styles.eyebrow}>Почему нам доверяют</div>
        <h2 className={`h2 ${styles.title}`}>Работаем так, чтобы не пришлось переделывать</h2>
        <div className={styles.grid}>
          {advantages.map((a, i) => (
            <div key={a.title}>
              <div className={styles.num}>{i + 1}</div>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
