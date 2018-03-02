const {generateEntity} = require(`../../generator/entity-generator`);
const ValidationError = require(`../util/validation-error`);
const {schema: keksobookingSchema} = require(`../util/validation-schema`);
const {validate} = require(`../util/validator`);

const offers = generateEntity();
const async = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const toPage = (data, skip = 0, limit = 20) => {
  return {
    data: data.slice(skip, skip + limit),
    skip,
    limit,
    total: data.length
  };
};

// const sendOffers = (req, res) => {
//   res.send(toPage(offers));
// };
class Controller {
  constructor(offerStore, imageStore) {
    this.offerStore = offerStore;
    this.imageStore = imageStore;
  }
}
  async sendOffers (async (req, res) => {
  const data = await toPage(await offerStore.getAllOffers());
  res.send(data);
});

sendOfferByDate = (req, res) => {
  const date = +req.params.date;
  const offer = offers.find((it) => it.date === date);

  if (!offer) {
    res.status(404).end();
  } else {
    res.send(offer);
  }
};

const saveOffer = (req, res) => {
  const data = req.body;
  const files = req.files;

  if (files) {
    if (files.avatar) {
      data.avatar = files.avatar[0].mimetype;
    }

    if (files.preview) {
      data.preview = files.preview[0].mimetype;
    }
  }

  const errors = validate(data, keksobookingSchema);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  res.send(data);
};

const handleError = (exception, req, res, next) => {
  let data = exception;

  if (exception instanceof ValidationError) {
    data = exception.errors;
  }

  res.status(400).send(data);
  next();
};

module.exports = (offerStore, imageStore) => {
  sendOfferByDate,
  saveOffer,
  sendOffers,
  handleError
};
