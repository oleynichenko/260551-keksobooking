const {generateOffers} = require(`../../test/generator/offers-generator`);
const {closeMongoClient} = require(`../database`);
const getOfferStore = require(`../server/offers/store`);

module.exports = {
  name: `--fill`,
  description: `заполняет базу тестовыми данными`,

  async execute() {
    console.log(`Подключение к базе..`);
    const offerStore = await getOfferStore();
    const offers = generateOffers();

    await offerStore.saveMany(offers);
    console.log(`База успешно наполнена тестовыми данными`);
    closeMongoClient();
  }
};
