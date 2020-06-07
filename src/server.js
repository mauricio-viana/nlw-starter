import express from 'express';
import winston from 'winston';
import routes from './routes.js';
import nunjucks from 'nunjucks';

const server = express();
const port = 3333;

server.listen(port, () => logger.info('Server started'));
server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));
server.use('/', routes);

nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    //new winston.transports.Console(),
    new winston.transports.File({ filename: './src/logs/ecoleta.log' }),
  ],
  format: combine(label({ label: 'Ecoleta' }), timestamp(), myFormat),
});
