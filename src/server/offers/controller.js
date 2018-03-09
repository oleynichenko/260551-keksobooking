const logger = require(`../../winston`);
const ValidationError = require(`../util/validation-error`);
const NotFoundError = require(`../util/not-found-error`);
const {schema: keksobookingSchema} = require(`../util/validation-schema`);
const customize = require(`../util/customize`);
const {validate} = require(`../util/validator`);
const createStreamFromBuffer = require(`../util/buffer-to-stream`);

const getController = (offerStore, imageStore) => {
  const _toPage = async (cursor, skip = 0, limit = 20) => {
    return {
      data: await (cursor.skip(skip).limit(limit).toArray()),
      skip,
      limit,
      total: await cursor.count()
    };
  };

  const getOffers = async (req, res) => {
    const query = req.query;
    let skip;
    let limit;

    if (query.skip) {
      skip = query.skip;
    }

    if (query.limit) {
      limit = query.limit;
    }

    const data = await _toPage(await offerStore.getAllOffers(), skip, limit);
    res.send(data);
  };

  const postOffer = async (req, res) => {
    const data = req.body;
    const files = req.files;

    logger.info(`received POST data: `, data);

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
        data.avatar = avatarInfo.path;
      }

      if (files.preview) {
        const previewFiles = files.preview;
        data.preview = [];

        previewFiles.forEach(async (file, index) => {
          const filePath = `/api/offers/${data.date}/preview${index}`;

          await imageStore.save(filePath, createStreamFromBuffer(file.buffer));

          data.preview.push(filePath);

          // const preview = files.preview[0];
          // const previewInfo = {
          //   path: `/api/offers/${data.date}/preview${index}`,
          //   mimetype: file.mimetype
          // };

          // await imageStore.save(previewInfo.path, createStreamFromBuffer(preview.buffer));
          // data.preview = previewInfo;
        });
      }
    }

    const customizedData = customize(data);

    await offerStore.save(customizedData);
    res.send(data);
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

    // res.set(`content-type`, avatar.mimetype);
    res.set(`content-length`, info.length);
    res.status(200);
    stream.pipe(res);
  };

  const handleErrors = (exception, req, res, next) => {
    let data = exception;
    let statusCode = 400;

    if (exception instanceof ValidationError) {
      data = exception.errors;
    }

    if (exception instanceof NotFoundError) {
      data = exception.errorMessage;
      statusCode = 404;
    }

    logger.error(`Ошибка обработки запросов`, data);
    res.status(statusCode).send(data);
    next();
  };

  return {
    getOffers,
    postOffer,
    getOfferByDate,
    getAvatar,
    handleErrors
  };
};

module.exports = getController;
