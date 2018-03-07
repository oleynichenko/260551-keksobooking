const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);

const ValidationError = require(`../util/validation-error`);
const NotFoundError = require(`../util/not-found-error`);
const {schema: keksobookingSchema} = require(`../util/validation-schema`);
const {validate} = require(`../util/validator`);
const createStreamFromBuffer = require(`../util/buffer-to-stream`);

const offersRouter = new Router();
const upload = multer({storage: multer.memoryStorage()});

const cpUpload = upload.fields([
  {name: `avatar`, maxCount: 1},
  {name: `preview`, maxCount: 1}
]);

const _toPage = async (cursor, skip = 0, limit = 20) => {
  return {
    data: await (cursor.skip(skip).limit(limit).toArray()),
    skip,
    limit,
    total: await cursor.count()
  };
};

const async = (fn) => (req, res, next) => fn(req, res, next).catch(next);

offersRouter.use(bodyParser.json());

offersRouter.get(`/`, async(async (req, res) => {
  const query = req.query;
  let skip;
  let limit;

  if (query.skip) {
    skip = query.skip;
  }

  if (query.limit) {
    limit = query.limit;
  }

  const data = await _toPage(await offersRouter.offerStore.getAllOffers(), skip, limit);
  res.send(data);
}));

offersRouter.post(`/`, cpUpload, async(async (req, res) => {
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

      await offersRouter.imageStore.save(avatarInfo.path, createStreamFromBuffer(avatar.buffer));
      data.avatar = avatarInfo;
    }

    if (files.preview) {
      const preview = files.preview[0];

      const previewInfo = {
        path: `/api/offers/${data.date}/preview`,
        mimetype: preview.mimetype
      };

      await offersRouter.imageStore.save(previewInfo.path, createStreamFromBuffer(preview.buffer));
      data.preview = previewInfo;
    }
  }

  await offersRouter.offerStore.save(data);
  res.send(req.body);
}));

offersRouter.get(`/:date`, async(async (req, res) => {
  const offersDate = parseInt(req.params.date, 10);
  const foundOffer = await offersRouter.offerStore.getOffer(offersDate);

  if (!foundOffer) {
    throw new NotFoundError(`Offer with date "${offersDate}" not found`);
  }

  res.send(foundOffer);
}));

offersRouter.get(`/:date/avatar`, async(async (req, res) => {
  const offersDate = parseInt(req.params.date, 10);

  const foundOffer = await offersRouter.offerStore.getOffer(offersDate);

  if (!foundOffer) {
    throw new NotFoundError(`Offer with date "${offersDate}" not found`);
  }

  const avatar = foundOffer.avatar;

  if (!avatar) {
    throw new NotFoundError(`Offer with date "${offersDate}" does not have avatar`);
  }

  const {info, stream} = await offersRouter.imageStore.get(avatar.path);

  if (!info) {
    throw new NotFoundError(`File was not found`);
  }

  res.set(`content-type`, avatar.mimetype);
  res.set(`content-length`, info.length);
  res.status(200);
  stream.pipe(res);
}));

offersRouter.use((exception, req, res, next) => {
  let data = exception;
  let statusCode = 400;

  if (exception instanceof ValidationError) {
    data = exception.errors;
  }

  if (exception instanceof NotFoundError) {
    data = exception.errorMessage;
    statusCode = 404;
  }

  res.status(statusCode).send(data);
  next();
});

module.exports = (offerStore, imageStore) => {
  offersRouter.offerStore = offerStore;
  offersRouter.imageStore = imageStore;

  return offersRouter;
};
