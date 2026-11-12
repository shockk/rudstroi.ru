// Зима — с ноября по март, по московскому времени.
export function currentSeason(date = new Date()): 'summer' | 'winter' {
  const month = Number(
    new Intl.DateTimeFormat('ru-RU', { month: 'numeric', timeZone: 'Europe/Moscow' }).format(date),
  );
  return month >= 11 || month <= 3 ? 'winter' : 'summer';
}
