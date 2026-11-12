// Общие данные компании. Значения с пометкой «заглушка» заменить реальными.

export const site = {
  name: 'РудСтрой',
  logo: { first: 'РУД', second: 'СТРОЙ' },
  tagline: 'Благоустройство участков, спецтехника, материалы',
  url: 'https://rudstroi.ru',
  phone: '+7 (901) 401-31-21',
  phoneHref: 'tel:+79014013121',
  email: 'rud.fahradyan@mail.ru',
  hours: 'Ежедневно 8:00–21:00', // заглушка
  callbackPromise: 'Перезвоним за 15 минут',
  cities: ['Красногорск', 'Дедовск', 'Снегири', 'Истра'],
  messengers: [
    { name: 'WhatsApp', href: 'https://wa.me/79014013121' }, // проверить, что WhatsApp на этом номере
    { name: 'Telegram', href: 'https://t.me/+79014013121' }, // проверить, что Telegram на этом номере и поиск по номеру разрешён
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
