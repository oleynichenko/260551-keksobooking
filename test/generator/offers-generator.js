const {PLACES, TIME, PHOTOS, Guests, Location, INITIAL_DATE} = require(`./offers-data`);
const {TYPES, FEATURES, Price, Rooms, NAMES} = require(`../../src/server/util/const`);
const {getRandomFromArr, getRandomString, mixArray, getRandomNumber} = require(`../../src/server/util/help-functions`);

const namesGenerator = function* (names) {
  const namesList = names.slice();

  while (namesList.length > 0) {
    const nameIndex = getRandomNumber(0, namesList.length - 1);
    yield namesList.splice(nameIndex, 1)[0];
  }
};

const datesGenerator = function* (initialDate, quantity) {
  yield initialDate;

  while (quantity > 1) {
    yield getRandomNumber(initialDate, Date.now());
  }
};

const getFeatures = () => FEATURES.filter(() => Math.random() > 0.5);

const generateOffers = (quantity = PLACES.length) => {
  const dates = datesGenerator(INITIAL_DATE, PLACES.length);

  const places = namesGenerator(PLACES);
  const placesOnUserRequest = [...places].slice(0, quantity);

  return placesOnUserRequest.map((place) => {
    const xLocation = getRandomNumber(Location.X_MIN, Location.X_MAX);
    const yLocation = getRandomNumber(Location.Y_MIN, Location.Y_MAX);

    return {
      author: {
        name: getRandomFromArr(NAMES),
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
      },
      date: dates.next().value
    };
  });
};

module.exports = {
  generateOffers
};
