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
}

module.exports = totalApi;
