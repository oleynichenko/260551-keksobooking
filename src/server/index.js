const express = require(`express`);
const {offersRouter} = require(`./offers/route`);

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
