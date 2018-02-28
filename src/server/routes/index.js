const express = require(`express`);
const {offersRouter} = require(`./offers`);

const init = (app) => {
  app.use(express.static(`static`));
  app.use(`/api/offers`, offersRouter);
};

module.exports = {
  init
};
