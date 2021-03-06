const logger = require(`../../winston`);
const {getConnection} = require(`../../database`);

const setupCollection = async () => {
  const dBase = await getConnection();
  const collection = dBase.collection(`offers`);

  collection.createIndex({date: -1}, {unique: true});

  return collection;
};

class OfferStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getOffer(date) {
    return (await this.collection).findOne({date});
  }

  async getOffers(skip, limit) {
    return (await this.collection).find().skip(skip).limit(limit).toArray();
  }

  async save(offerData) {
    return (await this.collection).insertOne(offerData);
  }

  async saveMany(offers) {
    return (await this.collection).insertMany(offers);
  }

  async count() {
    return (await this.collection).count();
  }
}

module.exports = async () => {
  const collection = await setupCollection()
      .catch((error) => logger.error(`Failed to set up "offers"-collection`, error));

  return new OfferStore(collection);
};
