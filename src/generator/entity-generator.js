const {Places, Types, Time, Features, Photos} = require(`../data/entity-data`);

const namesGenerator = function* (names) {
  const namesList = names.slice();

  while (namesList.length > 0) {
    const nameIndex = Math.floor(Math.random() * namesList.length);
    yield namesList.splice(nameIndex, 1)[0];
  }
};

const getFeatures = () => Features.filter(() => Math.random() > 0.5);

const getRandomString = () => Math.random().toString(36).substr(2, 7);

const mixArray = (arr) => {
  return arr.slice().sort((a, b) => Math.random() > 0.5 ? a - b : b - a);
};

const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max + 1 - min));
};

const getRandomFromArr = (arr) => arr[Math.floor(arr.length * Math.random())];

const places = namesGenerator(Places);

const generateEntity = () => [...places].map((place) => {
  const xLocation = getRandomNumber(300, 900);
  const yLocation = getRandomNumber(150, 500);

  return {
    author: {
      avatar: `https://robohash.org/${getRandomString()}`
    },

    offer: {
      title: place,
      adress: `${xLocation}, ${yLocation}`,
      price: getRandomNumber(1000, 1000000),
      type: getRandomFromArr(Types),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 20),
      checkin: getRandomFromArr(Time),
      checkout: getRandomFromArr(Time),
      features: getFeatures(),
      description: ``,
      photos: mixArray(Photos)
    },

    location: {
      x: xLocation,
      y: yLocation
    }
  };
});

module.exports = {
  generateEntity
};
