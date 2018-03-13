module.exports = class NotFoundError extends Error {
  constructor(reason) {
    super();
    this.code = 404;
    this.errorMessage = reason;
  }
};
