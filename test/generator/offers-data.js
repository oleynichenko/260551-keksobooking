const PLACES = [
  `Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неуютное бунгало по колено в воде`
];

const TIME = [
  `12:00`,
  `13:00`,
  `14:00`
];

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const Guests = {
  MIN: 1,
  MAX: 50
};

const Location = {
  X_MIN: 300,
  X_MAX: 900,
  Y_MIN: 150,
  Y_MAX: 500,
};

const INITIAL_DATE = Date.parse(`2017-01-01`);

module.exports = {
  PLACES,
  TIME,
  PHOTOS,
  Guests,
  Location,
  INITIAL_DATE
};
