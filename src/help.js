const COMMAND_LINE_LENGTH = 15;

function changeWordLength(word, length) {
  while (word.length < length) {
    word = word + ` `;
  }

  return word;
}

function showCommands(commands) {
  for (const key in commands) {
    if (commands.hasOwnProperty(key)) {
      const commandName = changeWordLength(commands[key].name, COMMAND_LINE_LENGTH);

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
