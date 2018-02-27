const express = require(`express`);
const routes = require(`./routes`);

const app = express();

routes.init(app);

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
