import { leadBlock } from '@/data/home';
import { services } from '@/data/services';
import { site } from '@/data/site';
import { LeadForm } from './LeadForm';
import styles from './LeadSection.module.css';

export function LeadSection({ defaultService }: { defaultService?: string }) {
  return (
    <section className={`section ${styles.lead}`} id="zayavka">
      <div className={`container ${styles.box}`}>
        <div>
          <div className="eyebrow">{leadBlock.eyebrow}</div>
          <h2 className={`h2 ${styles.title}`}>{leadBlock.title}</h2>
          <p className={styles.text}>{leadBlock.text}</p>
          <div className={styles.chips}>
            <a className={styles.chip} href={site.phoneHref}>
              {site.phone}
            </a>
            <a className={styles.chip} href={`mailto:${site.email}`}>
              {site.email}
            </a>
            {site.messengers.map((m) => (
              <a key={m.name} className={styles.chip} href={m.href} target="_blank" rel="noopener noreferrer">
                {m.name}
              </a>
            ))}
          </div>
        </div>
        <LeadForm services={services.map((s) => s.title)} defaultService={defaultService} />
      </div>
    </section>
  );
}
