const {TYPES, Price, Rooms, FEATURES, TitleLength, ADDRESS_LENGTH, Guests, NAMES} = require(`./const`);
const {getRandomFromArr} = require(`./help-functions`);
const {unique, isTimeFormat, inRange, oneOf, anyOf, isImage, allImages, textRange} = require(`./assertions`);

const schema = {
  title: {
    required: true,
    converter(val) {
      return val.trim();
    },
    assertions: [
      textRange(TitleLength.MIN, TitleLength.MAX)
    ]
  },
  type: {
    required: true,
    converter(val) {
      return val.trim();
    },
    assertions: [
      oneOf(TYPES)
    ]
  },
  price: {
    required: true,
    converter(val) {
      return Number(val);
    },
    assertions: [
      inRange(Price.MIN, Price.MAX)
    ]
  },
  address: {
    required: true,
    converter(val) {
      return val.trim();
    },
    assertions: [
      textRange(1, ADDRESS_LENGTH)
    ]
  },
  checkin: {
    required: true,
    converter(val) {
      return val.trim();
    },
    assertions: [
      isTimeFormat()
    ]
  },
  checkout: {
    required: true,
    converter(val) {
      return val.trim();
    },
    assertions: [
      isTimeFormat()
    ]
  },
  rooms: {
    required: true,
    converter(val) {
      return Number(val);
    },
    assertions: [
      inRange(Rooms.MIN, Rooms.MAX)
    ]
  },
  features: {
    required: false,
    converter(val = []) {
      return Array.isArray(val) ? val : [val];
    },
    assertions: [
      unique(), anyOf(FEATURES)
    ]
  },
  name: {
    required: false,
    converter(val = getRandomFromArr(NAMES)) {
      return val.trim();
    }
  },
  capacity: {
    required: false,
    converter(val) {
      return Number(val);
    },
    assertions: [
      inRange(Guests.MIN, Guests.MAX)
    ]
  },
  description: {
    required: false,
    converter(val = ``) {
      return val.trim();
    }
  },
  avatar: {
    required: false,
    converter(val = ``) {
      return val;
    },
    assertions: [
      isImage()
    ]
  },
  photos: {
    required: false,
    converter(val = []) {
      return val;
    },
    assertions: [
      allImages()
    ]
  },
};

module.exports = schema;

