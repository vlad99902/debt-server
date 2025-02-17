const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

//для работы с body запроса
app.use(express.json({ extended: true }));
//routes
//подключаемся к роуту
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/debt', require('./routes/debt.routes'));

// if(process.env.NODE_ENV === 'production') {
//   app.use('/', express.static(path.join()))
// }

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

start();
