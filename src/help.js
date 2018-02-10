const COMMAND_LINE_LENGHT = 15;

function changeWordLenght(word, length) {
  while (word.length < length) {
    word = word + ` `;
  }

  return word;
}

function showCommands(commands) {
  for (const key in commands) {
    if ({}.hasOwnProperty.call(commands, key)) {
      const commandName = changeWordLenght(commands[key].name, COMMAND_LINE_LENGHT);

      console.log(`${commandName} - ${commands[key].description}`);
    }
  }
}

module.exports = {
  name: `--help`,
  description: `печатает этот текст`,
  setCommands(commands) {
    this.commands = commands;
  },
  execute() {
    console.log(`\nДоступные команды:`);
    showCommands(this.commands);
  }
};
