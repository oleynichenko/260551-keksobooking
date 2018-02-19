const assert = require(`assert`);
const {PLACES, TYPES, TIME, FEATURES, PHOTOS, Price, Rooms, Guests, Location} = require(`../src/data/entity-data`);
const {generateEntity} = require(`../src/generator/entity-generator`);

const data = generateEntity();
const randomPlace = data[Math.floor(Math.random() * data.length)];

describe(`Generate data`, () => {
  it(`should generate data for all Places`, () => {
    assert.equal(data.length, PLACES.length);
  });
});

describe(`Random item from generated data should match the data model`, () => {

  describe(`Author`, () => {
    it(`"avatar" should exist with String value`, () => {
      assert.equal(typeof randomPlace.author.avatar, `string`);
    });

    it(`"avatar" should contain "https://robohash.org/"`, () => {
      assert.ok((randomPlace.author.avatar.startsWith(`https://robohash.org/`)));
    });
  });

  describe(`Offer`, () => {
    const offer = randomPlace.offer;

    it(`"title" should be one of PLACES data`, () => {
      assert.ok(PLACES.includes(offer.title));
    });

    it(`"price" should be between ${Price.MIN} and ${Price.MAX}`, () => {
      assert.ok(offer.price >= Price.MIN && offer.price <= Price.MAX);
    });

    it(`"type" should be one of TYPES data`, () => {
      assert.ok(TYPES.includes(offer.type));
    });

    it(`"rooms" should be between ${Rooms.MIN} and ${Rooms.MAX}`, () => {
      assert.ok(offer.rooms >= Rooms.MIN && offer.rooms <= Rooms.MAX);
    });

    it(`"guests" should be between ${Guests.MIN} and ${Guests.MAX}`, () => {
      assert.ok(offer.guests >= Guests.MIN && offer.guests <= Guests.MAX);
    });

    it(`"checkin" should be one of TIME data`, () => {
      assert.ok(TIME.includes(offer.checkin));
    });

    it(`"checkout" should be one of TIME data`, () => {
      assert.ok(TIME.includes(offer.checkout));
    });

    it(`"features" first item should be one of FEATURES data or feature's length should be 0`, () => {
      assert.ok(offer.features.length === 0 || FEATURES.includes(offer.features[0]));
    });

    it(`"description" is empty string`, () => {
      assert.ok(offer.description === ``);
    });

    it(`first item of "photos" should be one of PHOTOS data`, () => {
      assert.ok(PHOTOS.includes(offer.photos[0]));
    });
  });

  describe(`Location`, () => {
    it(`"location x" should be between ${Location.X_MIN} and ${Location.X_MAX}`, () => {
      assert.ok(randomPlace.location.x >= Location.X_MIN && randomPlace.location.x <= Location.X_MAX);
    });

    it(`"location y" should be between ${Location.Y_MIN} and ${Location.Y_MAX}`, () => {
      assert.ok(randomPlace.location.y >= Location.Y_MIN && randomPlace.location.y <= Location.Y_MAX);
    });
  });
});
