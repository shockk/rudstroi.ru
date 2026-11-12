# rudstroi.ru

Сайт компании: благоустройство (асфальт, плитка, газон, планировка), аренда спецтехники, инертные материалы, вывоз грунта, уборка и вывоз снега. Красногорск, Дедовск, Снегири, Истра.

Next.js (App Router, TypeScript, CSS Modules) с сервером; хостинг — Timeweb Cloud App Platform.

- Рабочий документ проекта: [docs/PROJECT.md](docs/PROJECT.md)
- Деплой: [docs/DEPLOY.md](docs/DEPLOY.md)

## Где что лежит

| Путь | Что |
|---|---|
| `data/site.ts` | телефон, города, мессенджеры, цифры доверия |
| `data/services.ts` | услуги: карточки, посадочные страницы, варианты в форме |
| `data/home.ts` | тексты главной, сезонный первый экран, примеры работ |
| `app/globals.css` | фирменные цвета и общие стили |
| `components/` | блоки страниц, у каждого свой `.module.css` |
| `app/api/lead/route.ts` | приём заявок → Telegram |
| `design/` | макеты и скриншоты палитр |

## Запуск

```bash
npm install
npm run dev
```
