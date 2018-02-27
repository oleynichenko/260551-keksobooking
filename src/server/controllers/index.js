const {generateEntity} = require(`../../generator/entity-generator`);

const offers = generateEntity();

const toPage = (data, skip = 0, limit = 20) => {
  return {
    data: data.slice(skip, skip + limit),
    skip,
    limit,
    total: data.length
  };
};

const sendOffers = (req, res) => {
  res.send(toPage(offers));
};

const sendOfferByDate = (req, res) => {
  const date = +req.params.date;
  const offer = offers.find((it) => it.date === date);

  if (!offer) {
    res.status(404).end();
  } else {
    res.send(offer);
  }
};

const saveOffer = (req, res) => {
  res.send(req.body);
};

module.exports = {
  sendOfferByDate,
  saveOffer,
  sendOffers
};
