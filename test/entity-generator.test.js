const assert = require(`assert`);
const {Places, Types, Time, Features, Photos} = require(`../src/data/entity-data`);
const {generateEntity} = require(`../src/generator/entity-generator`);

const data = generateEntity();
const randomPlace = data[Math.floor(Math.random() * data.length)];

describe(`Generate data`, () => {
  it(`should generate data for all Places`, () => {
    assert.equal(data.length, Places.length);
  });
});

describe(`Random item from generated data should match the data model`, () => {

  describe(`Author`, () => {
    it(`"avatar" should exist with String value`, () => {
      assert.equal(typeof randomPlace.author.avatar, `string`);
    });

    it(`"avatar" should contain "https://robohash.org/"`, () => {
      assert.ok((randomPlace.author.avatar.startsWith(`https://robohash.org/`)), true);
    });
  });

  describe(`Offer`, () => {
    const offer = randomPlace.offer;

    it(`"title" should be one of Places data`, () => {
      assert.ok(Places.includes(offer.title));
    });

    it(`"price" should be between 1000 and 1000000`, () => {
      assert.ok(offer.price >= 1000 && offer.price <= 1000000);
    });

    it(`"type" should be one of Types data`, () => {
      assert.ok(Types.includes(offer.type));
    });

    it(`"rooms" should be between 1 and 5`, () => {
      assert.ok(offer.rooms >= 1 && offer.rooms <= 5);
    });

    it(`"guests" should be between 1 and 50`, () => {
      assert.ok(offer.guests >= 1 && offer.guests <= 50);
    });

    it(`"checkin" should be one of Time data`, () => {
      assert.ok(Time.includes(offer.checkin));
    });

    it(`"checkout" should be one of Time data`, () => {
      assert.ok(Time.includes(offer.checkout));
    });

    it(`"features" first item should be one of Features data or feature's length shoul be 0`, () => {
      assert.ok(Features.includes(offer.features[0] || offer.features.length === 0));
    });

    it(`"description" is empty string`, () => {
      assert.ok(offer.description === ``);
    });

    it(`first item of "photos" should be one of Photos data`, () => {
      assert.ok(Photos.includes(offer.photos[0]));
    });
  });

  describe(`Location`, () => {
    it(`"location x" should be between 300 and 900`, () => {
      assert.ok(randomPlace.location.x >= 300 && randomPlace.location.x <= 900);
    });

    it(`"location y" should be between 150 and 500`, () => {
      assert.ok(randomPlace.location.y >= 150 && randomPlace.location.y <= 500);
    });
  });
});
