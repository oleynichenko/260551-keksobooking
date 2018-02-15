const getRandomString = () => Math.random().toString(36).substr(2, 7);

const generate = () => {
  return {
    author: {
      avatar: `https://robohash.org/${getRandomString()}`
    }
  };
};

module.exports = {
  generate
};
