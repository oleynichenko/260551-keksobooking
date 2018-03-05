const express = require(`express`);
const offerStore = require(`./offers/store`);
const imageStore = require(`./images/store`);
const offersRouter = require(`./offers/route`)(offerStore, imageStore);

const app = express();

app.use(express.static(`static`));
app.use(`/api/offers`, offersRouter);

const run = (port, host) => {
  app.listen(port, host, (err) => {
    if (err) {
      return console.error(err.message);
    }
    return console.log(`Сервер запущен на http://${host}:${port}`);
  });
};

module.exports = {
  run,
  app
};
