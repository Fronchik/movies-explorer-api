const HTTPError = require('./HTTPError');

class NotFound extends HTTPError {
  constructor() {
    super('Не найдено', 404);
  }
}

module.exports = NotFound;
