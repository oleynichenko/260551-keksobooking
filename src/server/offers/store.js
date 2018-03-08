const logger = require(`../../../winston`);
const getConnection = require(`../../database`);

const setupCollection = async () => {
  const dBase = await getConnection();
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

module.exports = async () => {
  const collection = await setupCollection()
      .catch((error) => logger.error(`Failed to set up "offers"-collection`, error));

  return new OfferStore(collection);
};
