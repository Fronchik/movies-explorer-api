const HTTPError = require('./HTTPError');

class Conflict extends HTTPError {
  constructor() {
    super('Неверный email', 409);
  }
}

module.exports = Conflict;
