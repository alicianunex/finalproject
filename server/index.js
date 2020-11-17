import express from 'express';
import bodyParser from 'body-parser';
import logger from './lib/logger.js';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

//Middleware
import httpLoggerMiddleware from './middleware/logger-middleware.js';
import jsonResponseMiddleware from './middleware/json-response.js';

// Router
import ratingRouter from './route/rating.js';

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 5000;
export const databaseURI =
  process.env.DATABASE_URL || 'mongodb://localhost/videogamesratings';

// Creacion del servidor
const server = express();
mongoose.connect(databaseURI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.use(cors());
server.use(bodyParser.json());
server.use(httpLoggerMiddleware);
server.use(jsonResponseMiddleware);
server.use(ratingRouter);
// Inicializa el servidor
server.listen(PORT, () =>
  // utilizando el logger de la libreria winston imprimo en consola que el servidor se ha iniciado
  logger.info(`server listening ${JSON.stringify({ HOST, PORT })}`),
);
