const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'db.json');

const getRestaurants = () => {
  return JSON.parse(fs.readFileSync(filePath));
};

const storeRestaurants = (restaurants) => {
  fs.writeFileSync(filePath, JSON.stringify(restaurants));
};

module.exports = {
  getRestaurants,
  storeRestaurants,
};
