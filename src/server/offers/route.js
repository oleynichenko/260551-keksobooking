const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const controller = require(`./controllers`);

const offersRouter = new Router();
const upload = multer({storage: multer.memoryStorage()});

const cpUpload = upload.fields([
  {name: `avatar`, maxCount: 1},
  {name: `preview`, maxCount: 1}
]);

offersRouter.use(bodyParser.json());

offersRouter.get(`/`, controller.sendOffers);
offersRouter.post(`/`, cpUpload, controller.saveOffer);
offersRouter.get(`/:date`, controller.sendOfferByDate);
offersRouter.use(controller.handleError);

module.exports = {
  offersRouter
};
