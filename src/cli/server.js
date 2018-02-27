const server = require(`../server`);
const config = require(`../server/config`);

module.exports = {
  name: `--server`,
  description: `запускает сервер`,
  async execute() {
    const port = await config.setPort();
    const host = config.hostname;

    server.run(port, host);
  }
};
