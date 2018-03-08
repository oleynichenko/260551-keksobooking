const logger = require(`../../winston`);
const express = require(`express`);
const getOfferStore = require(`./offers/store`);
const getController = require(`./offers/controller`);
const imageStore = require(`./images/store`);
const getRouter = require(`./offers/route`);

const createServer = async () => {
  const offerStore = await getOfferStore();
  const controller = getController(offerStore, imageStore);
  const offersRouter = getRouter(controller);

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
