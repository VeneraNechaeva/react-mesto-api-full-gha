// Используем библиотеку для логирования winston
const winston = require('winston');
const expressWinston = require('express-winston');

// Создадим логгер запросов
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

// Создадим логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

// Экспортируем логгеры
module.exports = {
  requestLogger,
  errorLogger,
};
