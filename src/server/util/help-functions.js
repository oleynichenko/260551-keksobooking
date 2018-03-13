const getRandomFromArr = (arr) => arr[Math.floor(arr.length * Math.random())];

const getRandomString = () => Math.random().toString(36).substr(2, 7);

const mixArray = (arr) => {
  return arr.slice().sort((a, b) => Math.random() > 0.5 ? a - b : b - a);
};

const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max + 1 - min));
};

module.exports = {
  getRandomFromArr,
  getRandomString,
  mixArray,
  getRandomNumber
};
