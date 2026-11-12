import { Advantages } from '@/components/Advantages';
import { Hero } from '@/components/Hero';
import { LeadSection } from '@/components/LeadSection';
import { ServiceCards } from '@/components/ServiceCards';
import { WinterBlock } from '@/components/WinterBlock';
import { Works } from '@/components/Works';
import { services } from '@/data/services';
import { currentSeason } from '@/lib/season';

// Главная пересобирается раз в час, чтобы сезонный первый экран переключался сам.
export const revalidate = 3600;

export default function HomePage() {
  const season = currentSeason();
  // Зимой услуга уборки снега идёт первой
  const ordered =
    season === 'winter'
      ? [...services].sort((a, b) => Number(b.season === 'winter') - Number(a.season === 'winter'))
      : services;

  return (
    <>
      <Hero season={season} />
      <section className="section" id="uslugi">
        <div className="container">
          <div className="eyebrow">Что делаем</div>
          <h2 className="h2">Всё для участка — от планировки до уборки снега</h2>
          <ServiceCards items={ordered} />
        </div>
      </section>
      <Advantages />
      <Works />
      <WinterBlock />
      <LeadSection defaultService={season === 'winter' ? 'Уборка и вывоз снега' : undefined} />
    </>
  );
}
