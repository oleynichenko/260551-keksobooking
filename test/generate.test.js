const assert = require(`assert`);
const generate = require(`../src/generate`);
const fs = require(`fs`);
const util = require(`util`);

const access = util.promisify(fs.access);
const unlink = util.promisify(fs.unlink);

describe(`Generate JSON data`, function () {
  it(`should fail on not existing folder`, () => {
    const tempFilePath = `${__dirname}/folder/testfile.json`;
    const placesQuantity = 1;

    return generate.execute(placesQuantity, tempFilePath)
        .then(() => assert.fail(`Path ${tempFilePath} should not be available`))
        .catch((err) => assert.ok(err));
  });

  it(`should create new file`, () => {
    const testFilePath = `${__dirname}/testfile.json`;
    generate.execute(1, testFilePath)
        .then(() => access(testFilePath))
        .then(() => unlink(testFilePath));
  });
});

