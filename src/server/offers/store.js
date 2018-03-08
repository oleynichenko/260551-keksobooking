const logger = require(`../../../winston`);
const db = require(`../../database`);

const setupCollection = async () => {
  const dBase = await db;
  const collection = dBase.collection(`offers`);

  // collection.createIndex({date: -1});

  return collection;
};

class OfferStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getOffer(date) {
    return (await this.collection).findOne({date});
  }

  async getAllOffers() {
    return (await this.collection).find();
  }

  async save(offerData) {
    return (await this.collection).insertOne(offerData);
  }
}

const collection = setupCollection()
    .catch((error) => {
      logger.error(`Failed to set up "offers"-collection`, error);
      process.exit(1);
    });

module.exports = new OfferStore(collection);
