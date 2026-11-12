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
    short: 'Въезды, площадки и дороги в посёлке. Основание, асфальтоукладчик, каток.',
    description: [
      'Асфальтируем въезды к дому, площадки под машины, проезды и дороги в коттеджных посёлках.',
      'Готовим основание: выемка грунта, бордюр, щебень с уплотнением. Горячий асфальт укладываем асфальтоукладчиком и прикатываем катком — покрытие ровное, без луж, не продавливается и не плывёт в жару.',
    ],
    image: local('asfalt', 'gotovaya-doroga-v-poselke'),
    imagePosition: '50% 60%',
    season: 'summer',
    gallery: [
      { src: local('asfalt', 'gotovaya-doroga-v-poselke'), alt: 'Новая асфальтовая дорога в коттеджном посёлке', caption: 'Готовая дорога в посёлке' },
      { src: local('asfalt', 'katok-po-novomu-asfaltu'), alt: 'Каток уплотняет свежий асфальт', caption: 'Уплотнение катком' },
      { src: local('asfalt', 'asfaltoukladchik-vdol-bordyura'), alt: 'Асфальтоукладчик укладывает асфальт вдоль бордюра', caption: 'Укладка асфальтоукладчиком' },
      { src: local('asfalt', 'ukladka-ploshchadki-samosval'), alt: 'Укладка асфальта на площадке, самосвал подаёт смесь', caption: 'Площадка: подача смеси самосвалом' },
      { src: local('asfalt', 'ukladka-u-zdaniya'), alt: 'Укладка асфальта у здания, рабочие разравнивают край', caption: 'Укладка у здания' },
      { src: local('asfalt', 'ukladka-proezda-u-parkovki'), alt: 'Асфальтирование проезда у парковки', caption: 'Проезд у парковки' },
      { src: local('asfalt', 'kromka-goryachego-asfalta'), alt: 'Ровная кромка горячего асфальта за укладчиком', caption: 'Ровная кромка покрытия' },
      { src: local('asfalt', 'razravnivanie-goryachej-smesi'), alt: 'Рабочие разравнивают горячую асфальтовую смесь', caption: 'Разравнивание горячей смеси' },
      { src: local('asfalt', 'shchebenochnoe-osnovanie'), alt: 'Щебёночное основание под асфальт между бордюрами', caption: 'Щебёночное основание' },
      { src: local('asfalt', 'bordyur-i-podgotovka-trotuara'), alt: 'Установленный бордюр и подготовка основания тротуара', caption: 'Бордюр и основание' },
      { src: local('asfalt', 'podgotovka-dorogi-katok'), alt: 'Подготовка дороги к асфальтированию, каток и бордюр', caption: 'Подготовка дороги' },
      { src: local('asfalt', 'nachalo-ukladki-dorogi'), alt: 'Начало укладки асфальта на грунтовой дороге', caption: 'Начало укладки' },
    ],
  },
  {
    slug: 'asfaltnaya-kroshka',
    title: 'Асфальтная крошка',
    short: 'Недорогое покрытие для подъездов, дорог в посёлке и стоянок.',
    description: [
      'Асфальтная крошка — прочное и экономичное покрытие для подъездов к дому, проездов в посёлке и стоянок.',
      'Готовим основание, привозим крошку, разравниваем и уплотняем катком или виброплитой. Покрытие не пылит, не размывается дождём и со временем становится только плотнее.',
    ],
    image: local('asfalt', 'kroshka-katok-v-poselke'),
    imagePosition: '50% 40%',
    season: 'summer',
    gallery: [
      { src: local('asfalt', 'kroshka-katok-v-poselke'), alt: 'Асфальтная крошка на проезде в посёлке, каток уплотняет', caption: 'Крошка и уплотнение катком' },
      { src: local('asfalt', 'kroshka-razravnivanie'), alt: 'Рабочие разравнивают асфальтную крошку на проезде', caption: 'Разравнивание крошки' },
      { src: local('asfalt', 'kroshka-podgotovka-proezda'), alt: 'Подготовка проезда под асфальтную крошку', caption: 'Подготовка проезда' },
      { src: local('asfalt', 'kroshka-ploshchadka-vibroplita'), alt: 'Асфальтная крошка на площадке, уплотнение виброплитой', caption: 'Площадка, виброплита' },
    ],
  },
  {
    slug: 'bruschatka-i-otmostka',
    title: 'Брусчатка и отмостка',
    short: 'Дорожки, площадки и отмостка из брусчатки, плитки и натурального камня.',
    description: [
      'Укладываем брусчатку, тротуарную плитку и натуральный камень: садовые и радиусные дорожки, площадки, отмостку вокруг дома.',
      'Делаем основание по всем правилам: выемка грунта, геотекстиль, щебень и песок с трамбовкой, бордюр по уровню. Отмостку делаем с уклоном от дома и ливневыми лотками — вода не идёт под фундамент, а покрытие не проседает и не зарастает травой.',
      'Помогаем подобрать и привозим материал: брусчатку, плитку, бордюр, песок и щебень.',
    ],
    image: local('bruschatka', 'dorozhka-radiusnaya-sad'),
    imagePosition: '50% 45%',
    season: 'summer',
    gallery: [
      { src: local('bruschatka', 'dorozhka-radiusnaya-sad'), alt: 'Радиусная дорожка из брусчатки в саду', caption: 'Радиусная дорожка в саду' },
      { src: local('bruschatka', 'dorozhka-s-krasnym-bordyurom'), alt: 'Дорожка из брусчатки с красной окантовкой', caption: 'Дорожка с цветной окантовкой' },
      { src: local('bruschatka', 'otmostka-u-terrasy'), alt: 'Отмостка из плитки вокруг террасы', caption: 'Отмостка вокруг террасы' },
      { src: local('bruschatka', 'dorozhka-v-sadu-bordyur'), alt: 'Садовая дорожка с бордюром', caption: 'Садовая дорожка с бордюром' },
      { src: local('bruschatka', 'otmostka-kamen-s-livnevkoj'), alt: 'Отмостка из натурального камня с ливнёвкой', caption: 'Отмостка из камня с ливнёвкой' },
      { src: local('bruschatka', 'ploshchadka-kamen-u-lestnicy'), alt: 'Площадка из натурального камня у лестницы', caption: 'Площадка из натурального камня' },
      { src: local('bruschatka', 'otmostka-bruschatka-cokol'), alt: 'Отмостка из красной брусчатки вдоль дома', caption: 'Отмостка из брусчатки вдоль дома' },
      { src: local('bruschatka', 'otmostka-vdol-doma'), alt: 'Отмостка из тёмной брусчатки вдоль нового дома', caption: 'Отмостка вдоль нового дома' },
      { src: local('bruschatka', 'ploshchadka-seraya-bruschatka'), alt: 'Площадка из серой брусчатки', caption: 'Площадка из серой брусчатки' },
      { src: local('bruschatka', 'dorozhka-radiusnaya-ukladka'), alt: 'Укладка радиусной дорожки', caption: 'Радиусная дорожка в работе' },
      { src: local('bruschatka', 'ukladka-mnogocvetnoj-bruschatki'), alt: 'Укладка многоцветной брусчатки у дома', caption: 'Укладка многоцветной брусчатки' },
      { src: local('bruschatka', 'otmostka-ukladka-s-livnevkoj'), alt: 'Укладка отмостки с ливнёвкой', caption: 'Отмостка с ливнёвкой' },
      { src: local('bruschatka', 'ustanovka-bordyura'), alt: 'Установка бордюра по уровню', caption: 'Установка бордюра' },
      { src: local('bruschatka', 'pesok-po-geotekstilyu'), alt: 'Песчаное основание по геотекстилю', caption: 'Песок по геотекстилю' },
      { src: local('bruschatka', 'geotekstil-osnovanie'), alt: 'Раскатка геотекстиля под основание', caption: 'Геотекстиль под основание' },
      { src: local('bruschatka', 'dorozhka-iz-plitnyaka-ukladka'), alt: 'Укладка дорожки из плитняка', caption: 'Дорожка из плитняка' },
      { src: local('bruschatka', 'otmostka-kamen-livnevka'), alt: 'Отмостка из камня и ливневый лоток', caption: 'Отмостка и ливневый лоток' },
      { src: local('bruschatka', 'betonnaya-otmostka-stupeni'), alt: 'Бетонная отмостка со ступенями вдоль дома', caption: 'Бетонное основание отмостки' },
    ],
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
      { src: local('naruzhnye-seti', 'nivelir-razmetka-uklona'), alt: 'Нивелир на дороге у траншеи для разметки уклона', caption: 'Разметка уклона нивелиром' },
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
    image: local('bruschatka', 'planirovka-grunt'),
    imagePosition: '50% 55%',
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
