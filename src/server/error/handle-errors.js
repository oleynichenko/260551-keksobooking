const logger = require(`../../winston`);
const ValidationError = require(`./validation-error`);
const NotFoundError = require(`./not-found-error`);

module.exports = (exception, req, res, next) => {
  let data = {
    error: `Internal Error`,
    errorMessage: `Server has fallen into unrecoverable problem.`
  };

  let statusCode = 500;

  if (exception instanceof ValidationError) {
    data = exception.errors;
    statusCode = 400;
  }

  if (exception instanceof NotFoundError) {
    data = exception.errorMessage;
    statusCode = 404;
  }

  logger.error(`Ошибка обработки запросов`, exception);
  res.status(statusCode).send(data);
  next();
};
