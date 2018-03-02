const {MongoClient} = require(`mongodb`);

const url = `mongodb://localhost:27017`;

module.export = MongoClient.connect(url)
    .then((client) => client.db(`keksobooking`))
    .catch((error) => {
      console.log(`Failed to connect to MongoDB`, error);
      process.exit(1);
    });
