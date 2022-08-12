const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/restaurants', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'db.json');
  const restaurants = JSON.parse(fs.readFileSync(filePath));
  res.render('restaurants', {
    restaurantsSum: restaurants.length,
    restaurants,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/confirm', (req, res) => {
  res.render('confirm');
});

app.get('/recommend', (req, res) => {
  res.render('recommend');
});

app.post('/recommend', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'db.json');
  const restaurants = JSON.parse(fs.readFileSync(filePath));
  const newResturant = req.body;
  newResturant.id = restaurants.length + 1;
  restaurants.push(newResturant);
  fs.writeFileSync(filePath, JSON.stringify(restaurants));

  res.redirect('/confirm');
});

app.listen(3000);
