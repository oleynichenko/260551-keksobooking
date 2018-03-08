const logger = require(`../../../winston`);
const express = require(`express`);
const getOfferStore = require(`./offers/store`);
const imageStore = require(`./images/store`);
const createOffersRouter = require(`./offers/route`);

const createServer = async () => {
  const offerStore = await getOfferStore();
  const offersRouter = createOffersRouter(offerStore, imageStore);

  const server = express();

  server.use(express.static(`static`));
  server.use(`/api/offers`, offersRouter);

  return server;
};

const run = async (port, host) => {
  const app = await createServer();

  app.listen(port, host, (err) => {
    if (err) {
      return logger.error(`Ошибка при запуске сервера`, err.message);
    }
    return logger.info(`Сервер запущен на http://${host}:${port}`);
  });
};

module.exports = {
  run
};
