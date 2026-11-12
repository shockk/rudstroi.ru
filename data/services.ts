// Услуги компании. Из этого списка генерируются карточки на главной,
// посадочные страницы /uslugi/<slug>/ и варианты в форме заявки.
// Фото временные (Unsplash) — заменить фото своих объектов.

export type Season = 'summer' | 'winter' | 'all';

export type Photo = { src: string; alt: string; caption?: string };

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string[];
  image: string;
  /** Какую часть фото показывать при обрезке, CSS object-position */
  imagePosition?: string;
  season: Season;
  /** Фото наших работ для галереи на странице услуги */
  gallery?: Photo[];
};

const local = (dir: string, name: string) => `/images/${dir}/${name}.webp`;

const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=1200&q=75&auto=format&fit=crop`;

export const services: Service[] = [
  {
    slug: 'asfaltirovanie',
    title: 'Асфальтирование',
    short: 'Въезды, стоянки и площадки у дома. Основание, укладка, каток.',
    description: [
      'Асфальтируем въезды, площадки под машину и подъезды к дому.',
      'Готовим основание из щебня, укладываем горячий асфальт и прикатываем катком — покрытие не просядет и не поплывёт в жару.',
    ],
    image: unsplash('photo-1772852311587-329719989e2b'),
    season: 'summer',
  },
  {
    slug: 'asfaltnaya-kroshka',
    title: 'Асфальтная крошка',
    short: 'Недорогое покрытие для подъездов, дорог в посёлке и стоянок.',
    description: [
      'Асфальтная крошка — прочное и экономичное покрытие для подъездных дорог и парковок.',
      'Привозим материал, разравниваем и уплотняем катком.',
    ],
    image: unsplash('photo-1782442002533-1aec0cf5a9d8'),
    season: 'summer',
  },
  {
    slug: 'trotuarnaya-plitka',
    title: 'Тротуарная плитка',
    short: 'Продажа и укладка. Дорожки, отмостка, зоны отдыха.',
    description: [
      'Продаём и укладываем тротуарную плитку: дорожки, отмостку, площадки и зоны отдыха.',
      'Делаем правильное основание с геотекстилем и бордюром — плитка не «гуляет» и не зарастает травой.',
    ],
    image: unsplash('photo-1563714193017-5a5fb60bc02b'),
    season: 'summer',
  },
  {
    slug: 'vhodnye-gruppy',
    title: 'Входные группы и крыльцо',
    short: 'Крыльцо и ступени для частного дома: плитка, клинкер, камень, прямые и радиусные.',
    description: [
      'Делаем входные группы для частных домов под ключ: бетонное основание, ступени и площадка крыльца, облицовка плиткой, клинкером или камнем.',
      'Строим прямые и радиусные (полукруглые) лестницы, подбираем облицовку под фасад дома. Ступени делаем с выносом и уклоном для стока воды — зимой на них не застаивается лёд.',
    ],
    image: local('vhodnye-gruppy', 'kryltso-polukrugloe-gotovo'),
    imagePosition: '50% 38%',
    season: 'summer',
    gallery: [
      { src: local('vhodnye-gruppy', 'kryltso-polukrugloe-gotovo'), alt: 'Полукруглое крыльцо из камня у кирпичного дома', caption: 'Полукруглое крыльцо из камня' },
      { src: local('vhodnye-gruppy', 'kryltso-seraya-plitka'), alt: 'Крыльцо и ступени из серой плитки', caption: 'Ступени и площадка из серой плитки' },
      { src: local('vhodnye-gruppy', 'kryltso-klinker'), alt: 'Крыльцо из красного клинкера', caption: 'Крыльцо из клинкерной плитки' },
      { src: local('vhodnye-gruppy', 'kryltso-polukrugloe-ukladka'), alt: 'Укладка облицовки на полукруглые ступени', caption: 'Радиусные ступени в процессе облицовки' },
      { src: local('vhodnye-gruppy', 'stupeni-radiusnye-ukladka'), alt: 'Облицовка радиусных ступеней светлым камнем', caption: 'Облицовка радиусных ступеней' },
      { src: local('vhodnye-gruppy', 'stupeni-radiusnye-process'), alt: 'Выкладка подступенков по радиусу', caption: 'Выкладка подступенков по радиусу' },
      { src: local('vhodnye-gruppy', 'kryltso-seraya-plitka-ukladka'), alt: 'Мастер затирает швы на ступенях крыльца', caption: 'Затирка швов на ступенях' },
      { src: local('vhodnye-gruppy', 'stupeni-radiusnye-osnovanie'), alt: 'Бетонное основание радиусных ступеней с подступенками', caption: 'Основание и подступенки' },
    ],
  },
  {
    slug: 'gazon-i-planirovka',
    title: 'Газон и планировка',
    short: 'Выравнивание участка, плодородный грунт, рулонный и посевной газон.',
    description: [
      'Планируем участок: выравниваем рельеф, завозим плодородный грунт.',
      'Укладываем рулонный газон или сеем — с подготовкой почвы и первым поливом.',
    ],
    image: unsplash('photo-1731259240474-5370d9ca53ba'),
    season: 'summer',
  },
  {
    slug: 'naruzhnye-seti',
    title: 'Наружные сети водоснабжения и канализации',
    short: 'Водопровод и канализация от дома до колодца или центральной сети: траншея, трубы, колодцы.',
    description: [
      'Прокладываем наружные сети к частному дому: водопровод от скважины или центральной сети, канализацию до септика или коллектора.',
      'Копаем траншею своей техникой, укладываем трубы на песчаную подушку с нужным уклоном, монтируем колодцы из бетонных колец, засыпаем и восстанавливаем покрытие — газон, плитку или асфальт.',
    ],
    image: local('naruzhnye-seti', 'transheya-ekskavator-truby'),
    imagePosition: '50% 30%',
    season: 'summer',
    gallery: [
      { src: local('naruzhnye-seti', 'transheya-ekskavator-truby'), alt: 'Экскаватор копает траншею, рядом лежат канализационные трубы', caption: 'Траншея под канализацию' },
      { src: local('naruzhnye-seti', 'kolodets-kolco-transheya'), alt: 'Бетонное кольцо колодца у траншеи, экскаватор-погрузчик', caption: 'Монтаж колодца' },
      { src: local('naruzhnye-seti', 'razgruzka-kolec-manipulyator'), alt: 'Разгрузка бетонных колец манипулятором', caption: 'Доставка колец манипулятором' },
      { src: local('naruzhnye-seti', 'truba-v-transhee-vdol-dorozhki'), alt: 'Канализационная труба в траншее вдоль дорожки из плитки', caption: 'Труба в траншее вдоль дорожки' },
      { src: local('naruzhnye-seti', 'truba-peschanaya-podushka'), alt: 'Труба на песчаной подушке в траншее', caption: 'Укладка на песчаную подушку' },
      { src: local('naruzhnye-seti', 'kolca-na-obekte'), alt: 'Бетонные кольца и трубы на объекте', caption: 'Кольца и трубы на объекте' },
    ],
  },
  {
    slug: 'arenda-spectehniki',
    title: 'Аренда спецтехники',
    short: 'Экскаваторы, самосвалы, катки, погрузчики — с опытным оператором.',
    description: [
      'Сдаём спецтехнику в аренду вместе с оператором: экскаваторы, самосвалы, катки, погрузчики.',
      'Подача техники в день обращения при наличии свободных машин.',
    ],
    image: unsplash('photo-1768085091650-e8e89ef57b76'),
    season: 'all',
  },
  {
    slug: 'materialy-i-vyvoz-grunta',
    title: 'Материалы и вывоз грунта',
    short: 'Песок, щебень, ПГС, асфальтная крошка. Доставка от одной машины.',
    description: [
      'Привозим песок, щебень, ПГС, плодородный грунт и асфальтную крошку — от одной машины.',
      'Вывозим лишний грунт после копки котлована и планировки.',
    ],
    image: unsplash('photo-1709958962346-6243abe88c22'),
    season: 'all',
  },
  {
    slug: 'uborka-i-vyvoz-snega',
    title: 'Уборка и вывоз снега',
    short: 'Расчистим участок и подъезд после снегопада, вывезем снег.',
    description: [
      'Расчищаем участок, въезд, парковку и дорожки после снегопада.',
      'Вывозим снег самосвалами. Можно договориться на весь сезон.',
    ],
    image: unsplash('photo-1765237908782-1c5573273b6f'),
    season: 'winter',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
