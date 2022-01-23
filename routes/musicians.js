const express = require('express');
const MusiciansService = require('../services/musicians'); 



const validationHandler = require('../utils/middleware/validationHandler');

function musiciansApi(app) {
  const router = express.Router();
  app.use('/api/musicians', router);

  const musiciansService = new MusiciansService();

  router.get('/', async function (req, res, next) {
    const { tags } = req.query;

    try {
      const musicians = await musiciansService.getMusicians({ tags }); 

      res.status(200).json({
        data: musicians,
        message: 'musicians listed',
      });
    } catch (err) {
      next(err);
    }
  });



}

module.exports = musiciansApi;