const HTTPError = require('./HTTPError');

class Forbidden extends HTTPError {
  constructor() {
    super('Нет прав доступа', 403);
  }
}

module.exports = Forbidden;
