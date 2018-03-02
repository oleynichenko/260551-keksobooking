const db = require(`../..database`);

const setupCollection = async () => {
  const dbBase = await db;

  const collection = dbBase.collection(`offers`);
  collection.createIndex({date: -1});
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

module.exports = new OfferStore(setupCollection().catch((error) => console.error(`Failed to set up "wizards"-collection`, error)));
