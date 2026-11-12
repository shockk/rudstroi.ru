// Общие данные компании. Значения с пометкой «заглушка» заменить реальными.

export const site = {
  name: 'РудСтрой',
  logo: { first: 'РУД', second: 'СТРОЙ' },
  tagline: 'Благоустройство участков, спецтехника, материалы',
  url: 'https://rudstroi.ru',
  phone: '+7 (900) 000-00-00', // заглушка
  phoneHref: 'tel:+79000000000', // заглушка
  hours: 'Ежедневно 8:00–21:00', // заглушка
  callbackPromise: 'Перезвоним за 15 минут',
  cities: ['Красногорск', 'Дедовск', 'Снегири', 'Истра'],
  messengers: [
    { name: 'WhatsApp', href: 'https://wa.me/79000000000' }, // заглушка
    { name: 'Telegram', href: 'https://t.me/' }, // заглушка
    { name: 'MAX', href: '#' }, // заглушка
  ],
  // Цифры доверия — заглушки, заменить реальными
  stats: [
    { value: '12 лет', label: 'работаем в районе' },
    { value: '480+', label: 'участков сделано' },
    { value: '3 года', label: 'гарантия на укладку' },
  ],
} as const;

export const nav = [
  { href: '/#uslugi', label: 'Услуги' },
  { href: '/#raboty', label: 'Наши работы' },
  { href: '/#zima', label: 'Уборка снега' },
  { href: '/#zayavka', label: 'Контакты' },
];
