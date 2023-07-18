require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const errorHandler = require('./middlwares/error');
const { requestLogger, errorLogger } = require('./middlwares/logger');
const corsHandler = require('./middlwares/cors');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(corsHandler);
app.use(express.json());

app.use(cookieParser());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
