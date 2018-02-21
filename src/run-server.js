const http = require(`http`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const url = require(`url`);
const path = require(`path`);

const readFile = promisify(fs.readFile);

const LOCALHOST = `localhost`;

const extensionToMIME = new Map([
  [`.css`, `text/css`],
  [`.html`, `text/html; charset=UTF-8`],
  [`.jpg`, `image/jpeg`],
  [`.png`, `image/png`],
  [`.ico`, `image/x-icon`]
]);

const pathToStatic = `${process.cwd()}/static`;

const server = http.createServer((req, res) => {
  const absolutePath = pathToStatic + url.parse(req.url).pathname;

  readFile(absolutePath)
      .then((data) => {
        const ext = path.extname(absolutePath);
        const contentType = extensionToMIME.get(ext);

        res.setHeader(`Content-Type`, contentType);
        res.setHeader(`Content-length`, Buffer.byteLength(data));

        res.end(data);
      })
      .catch(() => {
        res.writeHead(404, `Not Found`);
        res.end();
      });
});


module.exports = {
  run(port, hostname = LOCALHOST) {
    server.listen(port, hostname, (err) => {
      if (err) {
        return console.error(err.message);
      }
      return console.log(`Сервер запущен на http://${hostname}:${port}`);
    });
  }
};
