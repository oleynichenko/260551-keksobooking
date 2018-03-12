const {MongoClient} = require(`mongodb`);
const logger = require(`../winston`);

const DB_HOST = process.env.DB_HOST || `localhost:27017`;
const DB_NAME = process.env.DB_NAME || `keksobooking`;

const url = `mongodb://${DB_HOST}`;

let connection;

module.exports = async () => {
  if (!connection) {
    connection = await MongoClient.connect(url)
        .then((client) => {
          return client.db(DB_NAME);
        })
        .catch((error) => {
          logger.error(`Failed to connect to MongoDB`, error);
          process.exit(1);
        });
  }

  return connection;
};
