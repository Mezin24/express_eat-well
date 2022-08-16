const express = require('express');
const app = express();
const path = require('path');

const defaultRoutes = require('./routes/defaultRoutes');
const restaurantsRoutes = require('./routes/restaurantsRoutes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', defaultRoutes);
app.use('/', restaurantsRoutes);

app.use((req, res) => {
  res.status(404).render('404');
});

app.use((error, req, res, next) => {
  res.status(500).render('500');
});

app.listen(3000);
