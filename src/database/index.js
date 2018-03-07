const {MongoClient} = require(`mongodb`);

const url = `mongodb://localhost:27017`;

let connection;

module.exports = async () => {
  if (!connection) {
    connection = await MongoClient.connect(url)
        .then((client) => {
          return client.db(`keksobooking`);
        })
        .catch((error) => {
          console.log(`Failed to connect to MongoDB`, error);
          process.exit(1);
        });
  }

  return connection;
};

