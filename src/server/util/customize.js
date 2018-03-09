const {NAMES} = require(`./const`);
const {getRandomFromArr} = require(`./help-functions`);

const customize = (data) => {
  const location = data.address.split(`, `);
  return {
    author: {
      name: data.name || getRandomFromArr(NAMES),
      avatar: data.avatar || ``
    },
    offer: {
      title: data.title,
      address: data.address,
      price: data.price,
      type: data.type,
      rooms: data.rooms,
      capacity: data.capacity,
      checkin: data.checkin,
      checkout: data.checkout,
      features: data.features,
      description: data.description,
      photos: data.preview || []
    },
    location: {
      x: parseInt(location[0], 10),
      y: parseInt(location[1], 10),
    },
    date: data.date
  };
};

module.exports = customize;
