const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {generateEntity: generateOffers} = require(`../generator/entity-generator`);

const offersRouter = new Router();
const upload = multer({storage: multer.memoryStorage()});

const offers = generateOffers();

const toPage = (data, skip = 0, limit = 20) => {
  return {
    data: data.slice(skip, skip + limit),
    skip,
    limit,
    total: data.length
  };
};

offersRouter.use(bodyParser.json());

offersRouter.get(`/`, (req, res) => res.send(toPage(offers)));

offersRouter.post(`/`, upload.single(`avatar`), (req, res) => {
  res.send(req.body);
});

offersRouter.get(`/:date`, (req, res) => {
  const date = +req.params.date;
  const offer = offers.find((it) => it.date === date);

  if (!offer) {
    res.status(404).end();
  } else {
    res.send(offer);
  }
});

module.exports = {
  offersRouter
};
