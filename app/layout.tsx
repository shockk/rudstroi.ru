import type { Metadata } from 'next';
import { Onest } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { site } from '@/data/site';
import './globals.css';

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-onest',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — асфальт, плитка, спецтехника в ${site.cities[0]}е и Истре`,
    template: `%s — ${site.name}`,
  },
  description: `Асфальтирование, тротуарная плитка, газон, аренда спецтехники, материалы и уборка снега. ${site.cities.join(', ')}. Бесплатный выезд замерщика.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={onest.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
