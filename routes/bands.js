const express = require('express');
const BandsService = require('../services/bands'); 

const {
  bandIdSchema, 
  createBandSchema, 
  updateBandSchema, 
  bandLocationSchema
} = require('../utils/schemas/bands');

const validationHandler = require('../utils/middleware/validationHandler');

function bandsApi(app) {
 
  const router = express.Router();
  app.use('/api/bands', router);

  const bandsService = new BandsService();

  router.get('/', async function (req, res, next) {
    const { tags } = req.query;

    try {
      const bands = await bandsService.getBands({ tags }); 

      res.status(200).json({
        data: bands,
        message: 'bands listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/length', async function (req, res, next) {
    const { tags } = req.query;

    try {
      const length = await bandsService.getLengthBands({ tags });

      res.status(200).json({
        data: length,
        message: 'length of bands',
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
        res.status(200).json({
          data: bands,
          message: 'band retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );


  // router.get(
  //   '/:location',
  //   validationHandler({ location: bandLocationSchema }, 'params'),
  //   async function (req, res, next) {
  //     const { location } = req.params;

  //     try {
  //       const bands = await bandsService.getBandsByLatLng({ location });
  //       console.log(location);
  //       res.status(200).json({
  //         data: bands,
  //         message: 'bands in location',
  //       });
  //     } catch (err) {
  //       next(err);
  //     }
  //   }
  // );


  router.post(
    '/location',
    // validationHandler(createBandSchema),
    async function (req, res, next) {
      const { body: location } = req;
      try {
        const bands = await bandsService.getBandsByLatLng({ location });

        res.status(201).json({
          data: bands,
          message: 'bands in location',
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
