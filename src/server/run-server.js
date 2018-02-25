const express = require(`express`);
const {offersRouter} = require(`./route`);

const app = express();
const LOCALHOST = `localhost`;

app.use(express.static(`static`));

app.use(`/api/offers`, offersRouter);

module.exports = {
  run(port, hostname = LOCALHOST) {
    app.listen(port, hostname, (err) => {
      if (err) {
        return console.error(err.message);
      }
      return console.log(`Сервер запущен на http://${hostname}:${port}`);
    });
  },
  app
};
