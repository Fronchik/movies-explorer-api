const jwt = require('jsonwebtoken');
const Unauthorized = require('../components/Unauthorized');

// аутентификация пользователя на основе токена
const auth = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  // проверка на отсутствие токена
  if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
    next(new Unauthorized());
    return;
  }

  const token = bearerToken.replace('Bearer ', '');

  const { NODE_ENV, JWT_SECRET } = process.env;

  // храниться расшифрованная информация из токена
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    const error = new Unauthorized();
    next(error);
    return;
  }

  req.user = payload;
  next();
};

module.exports = auth;
