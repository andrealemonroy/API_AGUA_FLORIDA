const express = require('express');
const BandsService = require('../services/bands'); //UsersService

const {
  bandIdSchema, //userIdSchema
  createBandSchema, // createUserSchema
  updateBandSchema, // updateUserSchema
} = require('../utils/schemas/bands');

const validationHandler = require('../utils/middleware/validationHandler');

function bandsApi(app) {
  console.log('sdaj')
  const router = express.Router();
  app.use('/api/bands', router);

  const bandsService = new BandsService();

  router.get('/', async function (req, res, next) {
    const { tags } = req.query;

    try {
      const bands = await bandsService.getBands({ tags }); //getUsers

      res.status(200).json({
        data: bands,
        message: 'bands listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:bandId',
    validationHandler({ bandId: bandIdSchema }, 'params'),
    async function (req, res, next) {
      const { bandId } = req.params;

      try {
        const bands = await bandsService.getBand({ bandId });
        console.log(bandId);
        res.status(200).json({
          data: bands,
          message: 'band retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createBandSchema),
    async function (req, res, next) {
      const { body: band } = req;
      try {
        const createdBandId = await bandsService.createBand({ band });

        res.status(201).json({
          data: createdBandId,
          message: 'band created',
        });
      } catch (err) {
        console.log(err)
        next(err);
      }
    }
  );

  router.put(
    '/:bandId',
    validationHandler({ bandId: bandIdSchema }, 'params'),
    validationHandler(updateBandSchema),
    async function (req, res, next) {
      const { bandId } = req.params;
      const { body: band } = req;

      try {
        const updatedBandId = await bandsService.updateBand({
          bandId,
          band,
        });

        res.status(200).json({
          data: updatedBandId,
          message: 'band updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:bandId',
    validationHandler({ bandId: bandIdSchema }, 'params'),
    async function (req, res, next) {
      const { bandId } = req.params;

      try {
        const deletedBandId = await bandsService.deleteBand({ bandId });

        res.status(200).json({
          data: deletedBandId,
          message: 'band deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = bandsApi;
