const {MongoClient} = require(`mongodb`);

const url = `mongodb://localhost:27017`;

module.exports = MongoClient.connect(url)
    .then((client) => {
      return client.db(`keksobooking`);
    })
    .catch((error) => {
      console.log(`Failed to connect to MongoDB`, error);
      process.exit(1);
    });
