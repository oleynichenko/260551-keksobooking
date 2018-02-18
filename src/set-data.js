const readline = require(`readline`);
const fs = require(`fs`);
const generate = require(`./generate`);

require(`colors`);

const Answer = {
  YES: `yes`,
  NO: `no`
};


const userSettings = {};

const generateQuestion = `\nХотите сгенерировать данные? yes/no\n`;
const wrongCommandMessage = `Неизвестная команда`.red;

const placesQuestion = `Введите желаемое количество мест проживания от 1 до 8:\n`;
const placesMessage = `Количество не соответствует диапазону`.red;
const checkPlacesAnswer = (quantity) => {
  return (quantity >= 1 && quantity <= 8);
};

const filePathDefault = `${process.cwd()}`;
const filePathQuestion = `Укажите путь к файлу в папке проекта для сохранения данных:\n`;
const filePathMessage = `Такого пути к файлу не существует.`.red;

const rewritingQuestion = `Такой файл уже существует. Перезаписать? yes/no\n`.red;

const checkYesNoQuestion = (answer) => {
  return (answer === Answer.YES || answer === Answer.NO) ? true : false;
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
      console.log(`Данные не сгенерированы`.red);
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

  return getAnswer(generateQuestion, checkYesNoQuestion, wrongCommandMessage)
      .then((answer) => confirmGeneration(answer))
      .then(() => getAnswer(placesQuestion, checkPlacesAnswer, placesMessage))
      .then((quantity) => {
        userSettings.placesQuantity = quantity;
      })
      .then(() => getAnswer(filePathQuestion, checkFilePathAnswer, filePathMessage))
      .then((path) => {
        userSettings.filePath = `${filePathDefault}/${path}/${generate.fileName}`;
      })
      .then(() => fs.existsSync(userSettings.filePath) ? getAnswer(rewritingQuestion, checkYesNoQuestion, wrongCommandMessage) : Answer.YES)
      .then((answer) => confirmGeneration(answer))
      .then(() => generate.execute(userSettings.placesQuantity, userSettings.filePath))
      .then(() => rl.close())
      .catch(() => rl.close());
};

module.exports = {
  setData
};

