const {MongoClient} = require(`mongodb`);

const DB_HOST = process.env.DB_HOST || `localhost:27017`;
const url = `mongodb://${DB_HOST}`;

module.exports = MongoClient.connect(url)
    .then((client) => {
      return client.db(`keksobooking`);
    })
    .catch((error) => {
      console.log(`Failed to connect to MongoDB`, error);
      process.exit(1);
    });
