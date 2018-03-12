const {schema: keksobookingSchema} = require(`../util/validation-schema`);
const {validate} = require(`../util/validator`);
const createStreamFromBuffer = require(`../util/buffer-to-stream`);
const ValidationError = require(`../error/validation-error`);
const NotFoundError = require(`../error/not-found-error`);

const getController = (offerStore, imageStore) => {
  const getOffers = async (req, res) => {
    const query = req.query;
    let skip;
    let limit;

    if (query.skip) {
      skip = parseInt(query.skip, 10);
    }

    if (query.limit) {
      limit = parseInt(query.limit, 10);
    }

    const data = {
      data: await offerStore.getOffers(skip, limit),
      skip,
      limit,
      total: await offerStore.count()
    };

    res.send(data);
  };

  const postOffer = async (req, res) => {
    const data = Object.assign({}, req.body);
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

    data.date = Date.now();

    if (files) {
      if (files.avatar) {
        const avatar = files.avatar[0];

        const avatarInfo = {
          path: `/api/offers/${data.date}/avatar`,
          mimetype: avatar.mimetype
        };

        await imageStore.save(avatarInfo.path, createStreamFromBuffer(avatar.buffer));
        data.avatar = avatarInfo;
      }

      if (files.preview) {
        const preview = files.preview[0];

        const previewInfo = {
          path: `/api/offers/${data.date}/preview`,
          mimetype: preview.mimetype
        };

        await imageStore.save(previewInfo.path, createStreamFromBuffer(preview.buffer));
        data.preview = previewInfo;
      }
    }

    await offerStore.save(data);
    res.send(req.body);
  };

  const getOfferByDate = async (req, res) => {
    const offersDate = parseInt(req.params.date, 10);
    const foundOffer = await offerStore.getOffer(offersDate);

    if (!foundOffer) {
      throw new NotFoundError(`Offer with date "${offersDate}" not found`);
    }

    res.send(foundOffer);
  };

  const getAvatar = async (req, res) => {
    const offersDate = parseInt(req.params.date, 10);

    const foundOffer = await offerStore.getOffer(offersDate);

    if (!foundOffer) {
      throw new NotFoundError(`Offer with date "${offersDate}" not found`);
    }

    const avatar = foundOffer.avatar;

    if (!avatar) {
      throw new NotFoundError(`Offer with date "${offersDate}" does not have avatar`);
    }

    const {info, stream} = await imageStore.get(avatar.path);

    if (!info) {
      throw new NotFoundError(`File was not found`);
    }

    res.set(`content-type`, avatar.mimetype);
    res.set(`content-length`, info.length);
    res.status(200);
    stream.pipe(res);
  };

  return {
    getOffers,
    postOffer,
    getOfferByDate,
    getAvatar
  };
};

module.exports = getController;
