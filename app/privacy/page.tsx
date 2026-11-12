import type { Metadata } from 'next';
import { site } from '@/data/site';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Политика обработки персональных данных',
  robots: { index: false },
};

// ЧЕРНОВИК. Перед запуском заменить текстом, проверенным юристом (152-ФЗ),
// с реквизитами оператора персональных данных.
export default function PrivacyPage() {
  return (
    <section className="section">
      <div className={`container ${styles.text}`}>
        <h1>Политика обработки персональных данных</h1>
        <p className={styles.draft}>Черновик — текст будет заменён перед запуском сайта.</p>
        <p>
          Оставляя заявку на сайте {site.url.replace('https://', '')}, вы соглашаетесь на обработку имени, номера
          телефона и сведений о задаче, которые указали в форме. Данные используются только для того, чтобы связаться с
          вами и рассчитать стоимость работ, и не передаются третьим лицам для рекламы.
        </p>
        <p>Чтобы отозвать согласие или удалить данные, позвоните нам: {site.phone}.</p>
      </div>
    </section>
  );
}
