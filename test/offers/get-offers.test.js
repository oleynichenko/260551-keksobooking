const request = require(`supertest`);
const assert = require(`assert`);
const {PLACES, INITIAL_DATE} = require(`../generator/offers-data`);
const {app} = require(`../../src/server`);

describe(`GET /api/offers`, () => {
  it(`respond with JSON`, () => {
    return request(app)
        .get(`/api/offers`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const page = response.body;
          assert.equal(page.total, PLACES.length);
          assert.equal(Object.keys(page.data[0]).length, 4);
        });
  });

  it(`find offer by date`, () => {
    return request(app)
        .get(`/api/offers/${INITIAL_DATE}`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          assert.equal(response.body.date, INITIAL_DATE);
        });
  });

  it(`unknown address should respond with 404`, () => {
    return request(app)
        .get(`/api/offerssss`)
        .expect(404)
        .expect(`Content-Type`, /html/);
  });
});
