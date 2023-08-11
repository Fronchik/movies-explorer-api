const HTTPError = require('./HTTPError');

class Unauthorized extends HTTPError {
  constructor() {
    super('Неправильные почта или пароль', 401);
  }
}

module.exports = Unauthorized;
