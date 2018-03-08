const logger = require(`../../../winston`);

module.exports = class NotFoundError extends Error {
  constructor(reason) {
    super();
    this.code = 404;
    this.message = `Not found`;
    this.errorMessage = reason;
  }
};
