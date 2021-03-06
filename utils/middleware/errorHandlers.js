const { config } = require('../../config');
const boom = require('@hapi/boom');
function withErrorStack(error, stack) {
  if (config.dev) {
    return { ...error, stack };
  }
  return error;
}

function logErrors(err, req, res, next) {
  next(err);
}

function wrapError(err, req, res, next) {
  if (!err.boom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

function errorHandlers(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapError,
  errorHandlers
};
