const http = require(`http`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const url = require(`url`);
const path = require(`path`);

const readfile = promisify(fs.readFile);

const LOCALHOST = `localhost`;

const extToMIME = new Map([
  [`.css`, `text/css`],
  [`.html`, `text/html; charset=UTF-8`],
  [`.jpg`, `image/jpeg`],
  [`.png`, `image/png`],
  [`.ico`, `image/x-icon`]
]);

const pathToStatic = `${process.cwd()}/static`;
const INDEX = `/index.html`;

const sendError = (res, code, message) => {
  res.statusCode = code;
  res.statusMessage = message;
  res.setHeader(`Content-Type`, `text/plain`);
  res.end(message);
};

const getAbsolutePath = (address) => {
  const pathName = url.parse(address).pathname;
  return pathToStatic + ((pathName === `/`) ? INDEX : pathName);
};

const readFile = async (filePath, res) => {
  const data = await readfile(filePath);
  const extName = path.extname(filePath);

  res.setHeader(`Content-Type`, extToMIME.get(extName));
  res.setHeader(`Content-length`, Buffer.byteLength(data));
  res.end(data);
};

const server = http.createServer((req, res) => {
  const absolutePath = getAbsolutePath(req.url);

  (async () => {
    try {
      await readFile(absolutePath, res);
    } catch (err) {
      sendError(res, 404, `Not Found`);
    }
  })().catch((err) => {
    sendError(res, 500, err.message);
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
