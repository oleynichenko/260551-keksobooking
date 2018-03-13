module.exports = class ValidationError extends Error {
  constructor(errors) {
    super();
    this.code = 400;
    this.errors = errors;
  }
};
