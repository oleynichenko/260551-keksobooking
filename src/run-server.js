const http = require(`http`);
const fs = require(`fs`);
const url = require(`url`);
const path = require(`path`);

const LOCAL_HOST = `localhost`;

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

  fs.readFile(absolutePath, (err, data) => {
    if (err) {
      res.writeHead(404, `Not Found`);
      res.end();
    } else {
      const ext = path.extname(absolutePath);
      const contentType = extensionToMIME.get(ext);

      res.setHeader(`Content-Type`, contentType);
      res.setHeader(`content-length`, Buffer.byteLength(data));

      res.end(data);
    }
  });
});


module.exports = {
  run(port, hostname = LOCAL_HOST) {
    server.listen(port, hostname, (err) => {
      if (err) {
        return console.error(err.message);
      }
      return console.log(`Сервер запущен на http://${hostname}:${port}`);
    });
  }
};
