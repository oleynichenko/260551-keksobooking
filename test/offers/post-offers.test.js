const request = require(`supertest`);
const app = require(`express`)();

const testOffer = {
  name: `Pavel`,
  title: `Маленькая квартирка рядом с парком`,
  address: `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`,
  description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
  price: 30000,
  type: `flat`,
  rooms: 1,
  guests: 1,
  checkin: `9:00`,
  checkout: `7:00`,
  features: [`elevator`, `conditioner`]
};

describe(`POST /api/offers`, () => {
  it(`should consume JSON`, () => {
    return request(app)
        .post(`/api/offers`)
        .send(testOffer)
        .expect(200, testOffer)
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
        .field(`guests`, 1)
        .field(`checkin`, `9:00`)
        .field(`checkout`, `7:00`)
        .field(`features`, [`elevator`, `conditioner`])
        .expect(200, testOffer);
  });

  it(`should consume form-data with avatar`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Pavel`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .field(`price`, 30000)
        .field(`type`, `flat`)
        .field(`rooms`, 1)
        .field(`guests`, 1)
        .field(`checkin`, `9:00`)
        .field(`checkout`, `7:00`)
        .field(`features`, [`elevator`, `conditioner`])
        .attach(`avatar`, `test/fixtures/keks.jpg`)
        .expect(200, testOffer);
  });
});
