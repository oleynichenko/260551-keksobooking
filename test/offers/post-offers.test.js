const request = require(`supertest`);
const {TYPES, Price, Rooms, ADDRESS_LENGTH, TitleLength} = require(`../../src/server/util/const`);
const app = require(`express`)();
const mockOffersRouter = require(`./mock-offers-router`);

app.use(`/api/offers`, mockOffersRouter);

const offer = {
  name: `Pavel`,
  title: `Маленькая квартирка рядом с парком`,
  address: `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`,
  description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
  price: 30000,
  type: `flat`,
  rooms: 1,
  capacity: 1,
  checkin: `9:00`,
  checkout: `7:00`,
  features: [`elevator`, `conditioner`]
};

const incorrectOffer = {
  name: ``,
  title: `Маленькая квартирка`,
  address: `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō 102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō 102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō 102-0075 Tōkyō-to, регистрации и СМС.`,
  price: 300000,
  type: `room`,
  rooms: 1001,
  capacity: 1,
  checkin: `924:00`,
  checkout: `700`,
  features: [`elevator`, `elevator`]
};

describe(`POST /api/offers`, () => {
  it(`should consume JSON`, () => {
    return request(app)
        .post(`/api/offers`)
        .send(offer)
        .expect(200, offer)
        .expect(`Content-Type`, /json/);
  });

  it(`should consume form-data`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Pavel`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .field(`price`, 30000)
        .field(`type`, `flat`)
        .field(`rooms`, 1)
        .field(`capacity`, 1)
        .field(`checkin`, `9:00`)
        .field(`checkout`, `7:00`)
        .field(`features`, [`elevator`, `conditioner`])
        .expect(200, offer);
  });

  it(`should fail if 'title' is invalid`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`title`, incorrectOffer.title)
        .field(`type`, offer.type)
        .field(`price`, offer.price)
        .field(`address`, offer.address)
        .field(`checkin`, offer.checkin)
        .field(`checkout`, offer.checkout)
        .field(`rooms`, offer.rooms)
        .field(`features`, offer.features)
        .attach(`avatar`, `test/fixtures/keks.jpg`)
        .field(`name`, offer.name)
        .field(`description`, offer.description)
        .field(`capacity`, offer.capacity)
        .expect(400, [{
          fieldName: `title`,
          fieldValue: incorrectOffer.title,
          errorMessage: `text length should be in range ${TitleLength.MIN}..${TitleLength.MAX}`
        }]);
  });

  it(`should fail if 'type' is invalid`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`title`, offer.title)
        .field(`type`, incorrectOffer.type)
        .field(`price`, offer.price)
        .field(`address`, offer.address)
        .field(`checkin`, offer.checkin)
        .field(`checkout`, offer.checkout)
        .field(`rooms`, offer.rooms)
        .field(`features`, offer.features)
        .attach(`avatar`, `test/fixtures/keks.jpg`)
        .field(`name`, offer.name)
        .field(`description`, offer.description)
        .field(`capacity`, offer.capacity)
        .expect(400, [{
          fieldName: `type`,
          fieldValue: incorrectOffer.type,
          errorMessage: `should be one of [${TYPES}]`
        }]);
  });

  it(`should fail if 'avatar' is invalid`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`title`, offer.title)
        .field(`type`, offer.type)
        .field(`price`, offer.price)
        .field(`address`, offer.address)
        .field(`checkin`, offer.checkin)
        .field(`checkout`, offer.checkout)
        .field(`rooms`, offer.rooms)
        .field(`features`, offer.features)
        .attach(`avatar`, `test/fixtures/keks.txt`)
        .field(`name`, offer.name)
        .field(`description`, offer.description)
        .field(`capacity`, offer.capacity)
        .expect(400, [{
          fieldName: `avatar`,
          fieldValue: `text/plain`,
          errorMessage: `should be an image`
        }]);
  });

  it(`should fail if 'price' is invalid`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`title`, offer.title)
        .field(`type`, offer.type)
        .field(`price`, incorrectOffer.price)
        .field(`address`, offer.address)
        .field(`checkin`, offer.checkin)
        .field(`checkout`, offer.checkout)
        .field(`rooms`, offer.rooms)
        .field(`features`, offer.features)
        .attach(`avatar`, `test/fixtures/keks.jpg`)
        .field(`name`, offer.name)
        .field(`description`, offer.description)
        .field(`capacity`, offer.capacity)
        .expect(400, [{
          fieldName: `price`,
          fieldValue: incorrectOffer.price,
          errorMessage: `should be a number in range ${Price.MIN}..${Price.MAX}`
        }]);
  });

  it(`should fail if 'address' is invalid`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`title`, offer.title)
        .field(`type`, offer.type)
        .field(`price`, offer.price)
        .field(`address`, incorrectOffer.address)
        .field(`checkin`, offer.checkin)
        .field(`checkout`, offer.checkout)
        .field(`rooms`, offer.rooms)
        .field(`features`, offer.features)
        .attach(`avatar`, `test/fixtures/keks.jpg`)
        .field(`name`, offer.name)
        .field(`description`, offer.description)
        .field(`capacity`, offer.capacity)
        .expect(400, [{
          fieldName: `address`,
          fieldValue: incorrectOffer.address,
          errorMessage: `text length should be in range 1..${ADDRESS_LENGTH}`
        }]);
  });

  it(`should fail if 'checkin' is invalid`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`title`, offer.title)
        .field(`type`, offer.type)
        .field(`price`, offer.price)
        .field(`address`, offer.address)
        .field(`checkin`, incorrectOffer.checkin)
        .field(`checkout`, offer.checkout)
        .field(`rooms`, offer.rooms)
        .field(`features`, offer.features)
        .attach(`avatar`, `test/fixtures/keks.jpg`)
        .field(`name`, offer.name)
        .field(`description`, offer.description)
        .field(`capacity`, offer.capacity)
        .expect(400, [{
          fieldName: `checkin`,
          fieldValue: incorrectOffer.checkin,
          errorMessage: `should be in format HH:mm`
        }]);
  });

  it(`should fail if 'checkout' is invalid`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`title`, offer.title)
        .field(`type`, offer.type)
        .field(`price`, offer.price)
        .field(`address`, offer.address)
        .field(`checkin`, offer.checkin)
        .field(`checkout`, incorrectOffer.checkout)
        .field(`rooms`, offer.rooms)
        .field(`features`, offer.features)
        .attach(`avatar`, `test/fixtures/keks.jpg`)
        .field(`name`, offer.name)
        .field(`description`, offer.description)
        .field(`capacity`, offer.capacity)
        .expect(400, [{
          fieldName: `checkout`,
          fieldValue: incorrectOffer.checkout,
          errorMessage: `should be in format HH:mm`
        }]);
  });

  it(`should fail if 'rooms' is invalid`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`title`, offer.title)
        .field(`type`, offer.type)
        .field(`price`, offer.price)
        .field(`address`, offer.address)
        .field(`checkin`, offer.checkin)
        .field(`checkout`, offer.checkout)
        .field(`rooms`, incorrectOffer.rooms)
        .field(`features`, offer.features)
        .attach(`avatar`, `test/fixtures/keks.jpg`)
        .field(`name`, offer.name)
        .field(`description`, offer.description)
        .field(`capacity`, offer.capacity)
        .expect(400, [{
          fieldName: `rooms`,
          fieldValue: incorrectOffer.rooms,
          errorMessage: `should be a number in range ${Rooms.MIN}..${Rooms.MAX}`
        }]);
  });

  it(`should fail if 'features' not unique`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`title`, offer.title)
        .field(`type`, offer.type)
        .field(`price`, offer.price)
        .field(`address`, offer.address)
        .field(`checkin`, offer.checkin)
        .field(`checkout`, offer.checkout)
        .field(`rooms`, offer.rooms)
        .field(`features`, incorrectOffer.features)
        .attach(`avatar`, `test/fixtures/keks.jpg`)
        .field(`name`, offer.name)
        .field(`description`, offer.description)
        .field(`capacity`, offer.capacity)
        .expect(400, [{
          fieldName: `features`,
          fieldValue: incorrectOffer.features,
          errorMessage: `should contain unique items`
        }]);
  });
});
