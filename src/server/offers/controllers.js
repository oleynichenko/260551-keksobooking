// const ValidationError = require(`../util/validation-error`);
// const {schema: keksobookingSchema} = require(`../util/validation-schema`);
// const {validate} = require(`../util/validator`);
// const createStreamFromBuffer = require(`../util/buffer-to-stream`);


// module.exports = class Controller {
//   constructor(offerStore, imageStore) {
//     this.offerStore = offerStore;
//     this.imageStore = imageStore;
//   }

//   async _toPage(cursor, skip = 0, limit = 20) {
//     return {
//       data: await (cursor.skip(skip).limit(limit).toArray()),
//       skip,
//       limit,
//       total: await cursor.count()
//     };
//   }

//   async sendOffers(req, res) {
//     const data = await this._toPage(await this.offerStore.getAllOffers());
//     res.send(data);
//   }

//   async sendOfferByDate(req, res) {
//     const date = +req.params.date;
//     const offer = offers.find((it) => it.date === date);

//     if (!offer) {
//       res.status(404).end();
//     } else {
//       res.send(offer);
//     }
//   }

//   async saveOffer(req, res) {
//     const data = req.body;
//     const files = req.files;

//     if (files) {
//       if (files.avatar) {
//         data.avatar = files.avatar[0].mimetype;
//       }

//       if (files.preview) {
//         data.preview = files.preview[0].mimetype;
//       }
//     }

//     const errors = validate(data, keksobookingSchema);

//     if (errors.length > 0) {
//       throw new ValidationError(errors);
//     }

//     if (files) {
//       if (files.avatar) {
//         const avatar = files.avatar[0];

//         const avatarInfo = {
//           path: `/api/wizards/${data.date}/avatar`,
//           mimetype: avatar.mimetype
//         };
//         await this.imageStore.save(avatarInfo.path, createStreamFromBuffer(avatar.buffer));
//       }

//       if (files.preview) {
//         const preview = files.preview[0];

//         const previewInfo = {
//           path: `/api/wizards/${data.date}/preview`,
//           mimetype: preview.mimetype
//         };
//         await this.imageStore.save(previewInfo.path, createStreamFromBuffer(preview.buffer));
//       }
//     }

//     await this.offerStore.save(data);
//     res.send(data);
//   }

//   async handleError(exception, req, res, next) {
//     let data = exception;

//     if (exception instanceof ValidationError) {
//       data = exception.errors;
//     }

//     res.status(400).send(data);
//     next();
//   }
// }

// // module.exports = Controller;
