const getRouter = require(`../../src/server/offers/route`);
const getController = require(`../../src/server/offers/controller`);
const {generateOffers} = require(`../generator/offers-generator`);
const {OffersQuery} = require(`../../src/server/util/const`);

const offers = generateOffers();

class Cursor {
  constructor(data) {
    this.data = data;
  }

  skip(count) {
    return new Cursor(this.data.slice(count));
  }

  limit(count) {
    return new Cursor(this.data.slice(0, count));
  }

  async count() {
    return this.data.length;
  }

  async toArray() {
    return this.data;
  }
}

class MockOffersStore {
  constructor() {
  }

  async getOffer(date) {
    return offers.find((it) => it.date === date);
  }

  async getOffers(skip = OffersQuery.SKIP, limit = OffersQuery.LIMIT) {
    return new Cursor(offers).skip(skip).limit(limit).toArray();
  }

  async save() {
  }

  async count() {
    return new Cursor(offers).count();
  }
}

class MockImageStore {

  async getBucket() {
  }

  async get() {
  }

  async save() {
  }
}

const controller = getController(new MockOffersStore(), new MockImageStore());

module.exports = getRouter(controller);
