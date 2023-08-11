const HTTPError = require('./HTTPError');

class BadRequest extends HTTPError {
  constructor() {
    super('Неверные данные', 400);
  }
}

module.exports = BadRequest;
