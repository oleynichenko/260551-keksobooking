const schema = require(`./validation-schema`);

const customize = (data, date) => {
  const location = data.address.split(`, `);

  return {
    author: {
      name: schema.name.converter(data.name),
      avatar: schema.avatar.converter(data.avatar)
    },
    offer: {
      title: schema.title.converter(data.title),
      address: schema.address.converter(data.address),
      price: schema.price.converter(data.price),
      type: schema.type.converter(data.type),
      rooms: schema.rooms.converter(data.rooms),
      capacity: schema.capacity.converter(data.capacity),
      checkin: schema.checkin.converter(data.checkin),
      checkout: schema.checkout.converter(data.checkout),
      features: schema.features.converter(data.features),
      description: schema.description.converter(data.description),
      photos: schema.photos.converter(data.photos)
    },
    location: {
      x: parseInt(location[0], 10),
      y: parseInt(location[1], 10),
    },
    date
  };
};

module.exports = customize;
