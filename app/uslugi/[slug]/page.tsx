import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LeadSection } from '@/components/LeadSection';
import { ServiceCards } from '@/components/ServiceCards';
import { getService, services } from '@/data/services';
import { site } from '@/data/site';
import styles from './page.module.css';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: `${service.title} — ${site.cities.join(', ')}`,
    description: `${service.short} Бесплатный выезд замерщика. ${site.cities.join(', ')}.`,
    alternates: { canonical: `/uslugi/${service.slug}/` },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className={styles.hero}>
        <Image src={service.image} alt="" fill priority sizes="100vw" className={styles.bg} />
        <div className={`container ${styles.inner}`}>
          <nav className={styles.crumbs}>
            <Link href="/">Главная</Link> / <Link href="/#uslugi">Услуги</Link> / {service.title}
          </nav>
          <h1>{service.title}</h1>
          <p>{service.short}</p>
          <Link className="btn btn-accent" href="#zayavka">
            Рассчитать стоимость
          </Link>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.text}`}>
          {service.description.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className={styles.cities}>Работаем: {site.cities.join(', ')} и окрестности.</p>
        </div>
      </section>

      <LeadSection defaultService={service.title} />

      <section className="section">
        <div className="container">
          <div className="eyebrow">Ещё услуги</div>
          <h2 className="h2">Можно сделать вместе</h2>
          <ServiceCards items={others} />
        </div>
      </section>
    </>
  );
}
