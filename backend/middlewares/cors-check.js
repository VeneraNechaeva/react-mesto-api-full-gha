// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://mesto.nechaeva.nomoredomainsicu.ru',
  'http://mesto.nechaeva.nomoredomainsicu.ru',
  'https://mesto.nechaeva.nomoredomainsicu.ru/users/me',
  'http://mesto.nechaeva.nomoredomainsicu.ru/users/me',
  'localhost:3000',
];

// eslint-disable-next-line consistent-return
const corsCheck = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  next();
};

module.exports = { corsCheck };
