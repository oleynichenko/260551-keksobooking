const assert = require(`assert`);
const generate = require(`../src/generate`);

describe(`Generate JSON data`, function () {
  it(`should fail on not existing folder`, function (done) {
    const tempFileName = `${__dirname}/folder/testfile.json`;

    generate.execute(tempFileName, (err) => {
      if (!err) {
        assert.fail(`Path ${tempFileName} should not be available`);
      }
      done();
    });
    // return generate.execute(tempFileName, 1)
    //     .then(() => assert.fail(`Path ${tempFileName} should not be available`))
    //     .catch((e) => assert.ok(e));
  });
});
