const express = require('express');
const UsersService = require('../services/users');

const {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
  userLocationSchema
} = require('../utils/schemas/users');

const validationHandler = require('../utils/middleware/validationHandler');

function usersApi(app) {
  const router = express.Router();
  app.use('/api/users', router);

  const usersService = new UsersService();

  router.get('/', async function (req, res, next) {
    const { tags } = req.query;

    try {
      const users = await usersService.getUsers({ tags });

      res.status(200).json({
        data: users,
        message: 'users listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/length', async function (req, res, next) {
    const { tags } = req.query;

    try {
      const length = await usersService.getLengthUsers({ tags });

      res.status(200).json({
        data: length,
        message: 'length of users',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:userId',
    validationHandler({ userId: userIdSchema }, 'params'),
    async function (req, res, next) {
      const { userId } = req.params;

      try {
        const users = await usersService.getUser({ userId });
        res.status(200).json({
          data: users,
          message: 'user retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );


  // router.get(
  //   '/:location',
  //   validationHandler({ location: userLocationSchema  }, 'params'),
  //   async function (req, res, next) {
  //     const { location } = req.params;

  //     try {
  //       const users = await usersService.getUsersByLatLng({ location });
  //       console.log(location);
  //       res.status(200).json({
  //         data: users,
  //         message: 'users in location',
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
        const users = await usersService.getUsersByLatLng({ location });

        res.status(201).json({
          data: users,
          message: 'bands in location',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createUserSchema),
    async function (req, res, next) {
      const { body: user } = req;
      try {
        const createdUserId = await usersService.createUser({ user });

        res.status(201).json({
          data: createdUserId,
          message: 'user created',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:userId',
    validationHandler({ userId: userIdSchema }, 'params'),
    validationHandler(updateUserSchema),
    async function (req, res, next) {
      const { userId } = req.params;
      const { body: user } = req;

      try {
        const updatedUserId = await usersService.updateUser({
          userId,
          user,
        });

        res.status(200).json({
          data: updatedUserId,
          message: 'user updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:userId',
    validationHandler({ userId: userIdSchema }, 'params'),
    async function (req, res, next) {
      const { userId } = req.params;

      try {
        const deletedUserId = await usersService.deleteUser({ userId });

        res.status(200).json({
          data: deletedUserId,
          message: 'user deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = usersApi;
