const {TYPES, Price, Rooms, FEATURES, TitleLength, ADDRESS_LENGTH} = require(`./const`);

const unique = () => {
  return {
    assert(options) {
      const set = new Set(options);
      return set.size === options.length;
    },
    message: `should contain unique items`
  };
};

const isTimeFormat = () => {
  return {
    assert(time) {
      return /^(1?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
    },
    message: `should be in format HH:mm`
  };
};

const isNumeric = (number) => {
  return !isNaN(parseFloat(number)) && isFinite(number);
};

const inRange = (from, to) => {
  return {
    assert(number) {
      return isNumeric(number) && number >= from && number <= to;
    },
    message: `should be in range ${from}..${to}`
  };
};

const oneOf = (choices) => {
  return {
    assert(option) {
      return choices.indexOf(option) >= 0;
    },
    message: `should be one of [${choices}]`
  };
};

const anyOf = (choices) => {
  return {
    assert(options) {
      const assertion = oneOf(choices);
      return options.every((it) => assertion.assert(it));
    },
    message: `should contain items from [${choices}]`
  };
};

const isImage = () => {
  return {
    assert(mimetype) {
      return mimetype.startsWith(`image/`);
    },
    message: `should be an image`
  };
};

const textRange = (from, to) => {
  return {
    assert(text) {
      return text.length >= from && text.length <= to;
    },
    message: `text length should be in range ${from}..${to}`
  };
};

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
    assertions: [
      inRange(Rooms.MIN, Rooms.MAX)
    ]
  },
  features: {
    required: false,
    converter(val) {
      return val.split(`, `);
    },
    assertions: [
      unique(), anyOf(FEATURES)
    ]
  },
  name: {
    required: false,
    converter(val) {
      return val.trim();
    }
  },
  avatar: {
    required: false,
    assertions: [
      isImage()
    ]
  },
  preview: {
    required: false,
    assertions: [
      isImage()
    ]
  },
};

module.exports = {
  schema
};

