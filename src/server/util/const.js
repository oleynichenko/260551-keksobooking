const TYPES = [
  `flat`,
  `palace`,
  `house`,
  `bungalo`
];

const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

const Price = {
  MIN: 1000,
  MAX: 100000
};

const Rooms = {
  MIN: 1,
  MAX: 5
};

const TitleLength = {
  MIN: 30,
  MAX: 140
};

const ADDRESS_LENGTH = 100;

module.exports = {
  TYPES,
  FEATURES,
  Price,
  Rooms,
  TitleLength,
  ADDRESS_LENGTH
};
