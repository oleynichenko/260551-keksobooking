const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);

const upload = multer({storage: multer.memoryStorage()});

const cpUpload = upload.fields([
  {name: `avatar`, maxCount: 1},
  {name: `preview`, maxCount: 10}
]);

const offersRouter = new Router();
offersRouter.use(bodyParser.json());

offersRouter.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

const async = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const getRouter = (controller) => {
  offersRouter.get(`/`, async(controller.getOffers));
  offersRouter.post(`/`, cpUpload, async(controller.postOffer));
  offersRouter.get(`/:date`, async(controller.getOfferByDate));
  offersRouter.get(`/:date/aoffersRouterar`, async(controller.getAvatar));
  offersRouter.use(controller.handleErrors);

  return offersRouter;
};

module.exports = getRouter;
