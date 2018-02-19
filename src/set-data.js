const {PLACES} = require(`./data/entity-data`);
const readline = require(`readline`);
const fs = require(`fs`);
const generate = require(`./generate`);

require(`colors`);

const Answer = {
  YES: `yes`,
  NO: `no`
};

const Places = {
  MIN: 1,
  MAX: PLACES.length
};

const filePathDefault = `${process.cwd()}`;
const userSettings = {};

const Query = {
  GENERATE: `\nХотите сгенерировать данные? ${Answer.YES}/${Answer.NO}\n`,
  PLACES: `Введите количество мест проживания от ${Places.MIN} до ${Places.MAX}:\n`,
  FILE_PATH: `Укажите путь к файлу в папке проекта для сохранения данных:\n`,
  FILE_EXISTS: `Файл уже существует. Перезаписать? ${Answer.YES}/${Answer.NO}\n`
};

const Warning = {
  COMMAND: `Неизвестная команда`.red,
  PLACES: `Количество мест не соответствует диапазону`.red,
  FILE_PATH: `Такого пути к файлу не существует.`.red,
  DATA: `Данные не сгенерированы`.red
};

const checkPlacesAnswer = (quantity) => {
  return (quantity >= Places.MIN && quantity <= Places.MAX);
};

const checkYesNoQuestion = (answer) => {
  return (answer === Answer.YES || answer === Answer.NO);
};

const checkFilePathAnswer = (path) => {
  const filePath = `${filePathDefault}/${path}`;
  try {
    fs.accessSync(filePath);
    return true;
  } catch (err) {
    return false;
  }
};

const confirmGeneration = (answer) => {
  return new Promise((resolve, reject) => {
    if (answer === Answer.YES) {
      resolve();
    } else {
      console.log(Warning.DATA);
      reject();
    }
  });
};

const setData = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const getAnswer = (question, condition, message) => {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {

        if (condition(answer)) {
          resolve(answer);
        } else {
          console.log(message);

          resolve(getAnswer(question, condition, message));
        }
      });
    });
  };

  return getAnswer(Query.GENERATE, checkYesNoQuestion, Warning.COMMAND)
      .then((answer) => confirmGeneration(answer))
      .then(() => getAnswer(Query.PLACES, checkPlacesAnswer, Warning.PLACES))
      .then((quantity) => {
        userSettings.placesQuantity = quantity;
      })
      .then(() => getAnswer(Query.FILE_PATH, checkFilePathAnswer, Warning.FILE_PATH))
      .then((path) => {
        userSettings.filePath = `${filePathDefault}/${path}/${generate.fileName}`;
      })
      .then(() => fs.existsSync(userSettings.filePath) ?
        getAnswer(Query.FILE_EXISTS, checkYesNoQuestion, Warning.COMMAND) : Answer.YES)
      .then((answer) => confirmGeneration(answer))
      .then(() => generate.execute(userSettings.placesQuantity, userSettings.filePath))
      .then(() => rl.close())
      .catch(() => rl.close());
};

module.exports = {
  setData
};

