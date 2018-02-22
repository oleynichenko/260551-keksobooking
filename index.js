const packageInfo = require(`./package.json`);
const {handleCommand} = require(`./src/handle-command`);
const {setData} = require(`./src/set-data`);

const argv = process.argv.slice(2);
const flag = argv[0];

if (argv.length === 0) {
  console.log(`Привет пользователь! \nЭта программа запускает сервер «${packageInfo.name}».`);
  setData();
} else {
  handleCommand(flag);
}
