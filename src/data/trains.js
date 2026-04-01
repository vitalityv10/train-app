export const initialTrainsData = [
  { id: 1, title: 'Train Ticket', price: 100, route: ['Kyiv', 'Warsaw'], number: '43', hasWifi: true, description: 'Найшвидший рейс до Польщі.' },
  { id: 2, title: 'Train Ticket', price: 150, route: ['Lviv', 'Prague'], number: '12', hasWifi: false, description: 'Комфортний нічний переїзд.' },
  { id: 3, title: 'Train Ticket', price: 80, route: ['Odesa', 'Kyiv'], number: '105', hasWifi: true, description: 'Фірмовий поїзд "Чорноморець".' },
  { id: 4, title: 'Train Ticket', price: 120, route: ['Ivano-Frankivsk', 'Berlin'], number: '7', hasWifi: true, description: 'Міжнародний експрес.' },
  { id: 5, title: 'Train Ticket', price: 90, route: ['Kharkiv', 'Lviv'], number: '15', hasWifi: false, description: 'Прямий рейс через всю країну.' },
  { id: 6, title: 'Train Ticket', price: 200, route: ['Kyiv', 'Vienna'], number: '749', hasWifi: true, description: 'Європейський комфорт.' },
  { id: 7, title: 'Train Ticket', price: 60, route: ['Kyiv', 'Lviv'], number: '741', hasWifi: true, description: 'Інтерсіті+ з кавою та Wi-Fi.' },
  { id: 8, title: 'Train Ticket', price: 110, route: ['Dnipro', 'Kyiv'], number: '733', hasWifi: true, description: 'Денний швидкісний поїзд.' },
  { id: 9, title: 'Train Ticket', price: 180, route: ['Lviv', 'Budapest'], number: '33', hasWifi: false, description: 'Затишний маршрут до Угорщини.' },
  { id: 10, title: 'Train Ticket', price: 220, route: ['Kyiv', 'Munich'], number: '89', hasWifi: true, description: 'Тривала подорож бізнес-класом.' },
  { id: 11, title: 'Train Ticket', price: 45, route: ['Odesa', 'Vinnytsia'], number: '124', hasWifi: false, description: 'Економічний регіональний рейс.' },
  { id: 12, title: 'Train Ticket', price: 130, route: ['Uzhhorod', 'Kyiv'], number: '29', hasWifi: true, description: 'Нічний експрес через Карпати.' },
  { id: 13, title: 'Train Ticket', price: 75, route: ['Poltava', 'Kyiv'], number: '722', hasWifi: true, description: 'Швидкий ранковий поїзд.' },
  { id: 14, title: 'Train Ticket', price: 140, route: ['Kyiv', 'Chelm'], number: '23', hasWifi: false, description: 'Зручна стиковка з польськими поїздами.' },
  { id: 15, title: 'Train Ticket', price: 95, route: ['Lviv', 'Odesa'], number: '26', hasWifi: true, description: 'Поїзд єднання: Захід - Південь.' },
  { id: 16, title: 'Train Ticket', price: 55, route: ['Kyiv', 'Chernihiv'], number: '702', hasWifi: false, description: 'Приміський швидкісний маршрут.' },
  { id: 17, title: 'Train Ticket', price: 170, route: ['Chernivtsi', 'Przemysl'], number: '36', hasWifi: true, description: 'Міжнародний рейс із Буковини.' },
  { id: 18, title: 'Train Ticket', price: 125, route: ['Kyiv', 'Riga'], number: '31', hasWifi: false, description: 'Поїзд чотирьох столиць.' },
  { id: 19, title: 'Train Ticket', price: 210, route: ['Lviv', 'Venice'], number: '402', hasWifi: true, description: 'Туристичний рейс до Італії.' },
  { id: 20, title: 'Train Ticket', price: 85, route: ['Ternopil', 'Kyiv'], number: '716', hasWifi: true, description: 'Швидкий двоповерховий поїзд.' }
];

export const getAllCities = (trains) => {
  const cities = new Set();
  trains.forEach(train => {
    train.route.forEach(city => cities.add(city));
  });
  return Array.from(cities).sort();
};