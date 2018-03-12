const schema = require(`../util/validation-schema`);
const customize = require(`../util/customize`);
const validate = require(`../util/validator`);
const createStreamFromBuffer = require(`../util/buffer-to-stream`);
const ValidationError = require(`../error/validation-error`);
const NotFoundError = require(`../error/not-found-error`);
const {OffersQuery} = require(`../util/const`);

const getController = (offerStore, imageStore) => {
  const getOffers = async (req, res) => {
    const query = req.query;

    let skip = OffersQuery.SKIP;
    let limit = OffersQuery.LIMIT;

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

    res.status(200);
    res.send(data);
  };

  const postOffer = async (req, res) => {
    const data = req.body;
    const files = req.files;
    let avatar;
    let photos;

    if (files) {
      if (files.avatar) {
        avatar = files.avatar[0];
        data.avatar = avatar.mimetype;
      }

      if (files.preview) {
        photos = files.preview;
        data.photos = photos.map((file) => file.mimetype);
      }
    }

    const errors = validate(data, schema);

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    data.date = Date.now();

    if (avatar) {
      const avatarPath = `/api/offers/${data.date}/avatar`;

      await imageStore.save(avatarPath, avatar.mimetype, createStreamFromBuffer(avatar.buffer));

      data.avatar = avatarPath;
    }

    if (photos) {
      let photosPaths = [];

      for (let i = 0; i < photos.length; i++) {
        const photoPath = `/api/offers/${data.date}/photo${i}`;

        await imageStore.save(photoPath, photos[i].mimetype, createStreamFromBuffer(photos[i].buffer));

        photosPaths.push(photoPath);
      }

      data.photos = photosPaths;
    }

    const customizedData = customize(data);

    await offerStore.save(customizedData);
    res.status(200);
    res.send(data);
  };

  const getOfferByDate = async (req, res) => {
    const offersDate = parseInt(req.params.date, 10);
    const foundOffer = await offerStore.getOffer(offersDate);

    if (!foundOffer) {
      throw new NotFoundError(`Offer with date "${offersDate}" not found`);
    }

    res.status(200);
    res.send(foundOffer);
  };

  const getAvatar = async (req, res) => {
    const offersDate = parseInt(req.params.date, 10);

    const foundOffer = await offerStore.getOffer(offersDate);

    if (!foundOffer) {
      throw new NotFoundError(`Offer with date "${offersDate}" not found`);
    }

    const avatar = foundOffer.author.avatar;
    if (!avatar) {
      throw new NotFoundError(`Offer with date "${offersDate}" does not have avatar`);
    }

    const {info, stream} = await imageStore.get(avatar);

    if (!info) {
      throw new NotFoundError(`File was not found`);
    }

    res.set(`content-type`, info.contentType);
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
