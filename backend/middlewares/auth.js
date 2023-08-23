// Защита роутов авторизацией (Авторизационный мидлвэр)
const jwt = require('jsonwebtoken');

// Импортируем переменные окружения
const { NODE_ENV, JWT_SECRET } = process.env;

const utils = require('../utils/utils');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // достаём токен из Куки
  const jwtToken = req.cookies.jwt;

  let payload;

  try {
    // верифицируем токен (verify вернёт пейлоуд токена, если он прошёл проверку)
    payload = jwt.verify(jwtToken, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new utils.IncorrectAuthorizationError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
