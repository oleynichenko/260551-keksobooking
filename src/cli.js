const version = require(`./cli/version`);
const author = require(`./cli/author`);
const description = require(`./cli/description`);
const project = require(`./cli/project`);
const license = require(`./cli/license`);
const generate = require(`./cli/generate`);
const server = require(`./cli/server`);
const fill = require(`./cli/fill`);

require(`colors`);

function handleCommand(userText) {
  const help = {
    name: `--help`,
    description: `печатает этот текст`,
    execute() {
      const COMMAND_LINE_LENGTH = 15;

      console.log(`\nДоступные команды:`);
      for (const key in commands) {
        if (commands.hasOwnProperty(key)) {
          const commandName = commands[key].name.padEnd(COMMAND_LINE_LENGTH);

          console.log(`${commandName.grey} - ${commands[key].description.green}`);
        }
      }
    }
  };

  const commands = {
    [help.name]: help,
    [version.name]: version,
    [license.name]: license,
    [author.name]: author,
    [project.name]: project,
    [description.name]: description,
    [generate.name]: generate,
    [server.name]: server,
    [fill.name]: fill
  };

  let userCommand = commands[userText];

  if (typeof userCommand === `undefined`) {
    console.log(`Неизвестная команда "${userText}"`);

    userCommand = help;
    process.exitCode = 1;
  }

  userCommand.execute();
}

module.exports = {
  handleCommand
};
