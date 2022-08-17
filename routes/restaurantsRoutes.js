const e = require('express');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const resData = require('../utils/restaurant-data');

router.get('/restaurants', (req, res) => {
  let { order } = req.query;

  let nextOrder = 'desc';

  if (order !== 'asc' && order !== 'desc') {
    order = 'asc';
  }

  if (order === 'desc') {
    nextOrder = 'asc';
  }

  const restaurants = resData.getRestaurants();

  restaurants.sort((a, b) => {
    if (
      (a.name > b.name && order === 'asc') ||
      (order === 'desc' && b.name > a.name)
    ) {
      return 1;
    } else {
      return -1;
    }
  });

  res.render('restaurants', {
    restaurantsSum: restaurants.length,
    restaurants,
    nextOrder,
  });
});

router.get('/confirm', (req, res) => {
  res.render('confirm');
});

router.get('/recommend', (req, res) => {
  res.render('recommend');
});

router.post('/recommend', (req, res) => {
  const restaurants = resData.getRestaurants();
  const newResturant = req.body;
  newResturant.id = uuidv4();
  restaurants.push(newResturant);
  resData.storeRestaurants(restaurants);

  res.redirect('/confirm');
});

router.get('/restaurants/:id', (req, res) => {
  const id = req.params.id;

  const restaurants = resData.getRestaurants();
  const restaurant = restaurants.find((item) => item.id === id);

  if (!restaurant) {
    return res.status(404).render('404');
  }

  res.render('restaurant-detail', restaurant);
});

module.exports = router;
