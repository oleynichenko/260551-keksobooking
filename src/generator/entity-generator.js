const {PLACES, TYPES, TIME, FEATURES, PHOTOS, Price, Rooms, Guests, Location} = require(`../data/entity-data`);

const namesGenerator = function* (names) {
  const namesList = names.slice();

  while (namesList.length > 0) {
    const nameIndex = getRandomNumber(0, namesList.length - 1);
    yield namesList.splice(nameIndex, 1)[0];
  }
};

const getFeatures = () => FEATURES.filter(() => Math.random() > 0.5);

const getRandomString = () => Math.random().toString(36).substr(2, 7);

const mixArray = (arr) => {
  return arr.slice().sort((a, b) => Math.random() > 0.5 ? a - b : b - a);
};

const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max + 1 - min));
};

const getRandomFromArr = (arr) => arr[Math.floor(arr.length * Math.random())];

const places = namesGenerator(PLACES);

const generateEntity = (quantity = PLACES.length) => {
  const placesOnUserRequest = [...places].slice(0, quantity);

  return placesOnUserRequest.map((place) => {
    const xLocation = getRandomNumber(Location.X_MIN, Location.X_MAX);
    const yLocation = getRandomNumber(Location.Y_MIN, Location.Y_MAX);

    return {
      author: {
        avatar: `https://robohash.org/${getRandomString()}`
      },
      offer: {
        title: place,
        address: `${xLocation}, ${yLocation}`,
        price: getRandomNumber(Price.MIN, Price.MAX),
        type: getRandomFromArr(TYPES),
        rooms: getRandomNumber(Rooms.MIN, Rooms.MAX),
        guests: getRandomNumber(Guests.MIN, Guests.MAX),
        checkin: getRandomFromArr(TIME),
        checkout: getRandomFromArr(TIME),
        features: getFeatures(),
        description: ``,
        photos: mixArray(PHOTOS)
      },
      location: {
        x: xLocation,
        y: yLocation
      }
    };
  });
};

module.exports = {
  generateEntity
};
