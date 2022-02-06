const express = require('express');
const TotalService = require('../services/total');

async function totalApi(app) {
  const router = express.Router();
  app.use('/api/total', router);
  const totalService = new TotalService();
  router.get('/', async function (req, res, next) {
    try {
      const total = await totalService.getTotal()
      res.status(200).json({
        total: total,
      });
    } catch (err) {
      next(err);
    }
  });
  router.get('/sum', async function (req, res, next) {
    try {
      const total = await totalService.getSumTotal()
      res.status(200).json({
        total: total,
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/location', async function (req, res, next) {
    try {
      const total = await totalService.getLocation()
      res.status(200).json({
        data: total,
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/byLocation', async function (req, res, next) {
    try {
      console.log(req.body)
      const total = await totalService.getByLocation(req.body)
      res.status(200).json({
        data: total,
      });
    } catch (err) {
      next(err);
    }
  });

}

module.exports = totalApi;
