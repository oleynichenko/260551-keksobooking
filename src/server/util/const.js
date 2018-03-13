const NAMES = [
  `Keks`,
  `Pavel`,
  `Nikolay`,
  `Alex`,
  `Ulyana`,
  `Anastasyia`,
  `Julia`
];

const OffersQuery = {
  SKIP: 0,
  LIMIT: 20
};

const Guests = {
  MIN: 0,
  MAX: 50
};

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
  NAMES,
  TYPES,
  Guests,
  FEATURES,
  Price,
  Rooms,
  TitleLength,
  ADDRESS_LENGTH,
  OffersQuery
};
