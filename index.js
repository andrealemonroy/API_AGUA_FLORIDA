// const cors = require('cors');
const express = require('express');
const app = express();
const { config } = require('./config/index');
const usersApi = require('./routes/users.js');
const bandsApi = require('./routes/bands.js');
const musiciansApi = require('./routes/musicians.js');

const {
  logErrors,
  errorHandlers,
  wrapError
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler')

// body parser
app.use(express.json({limit:'50mb'}));

usersApi(app);
bandsApi(app);
musiciansApi(app);
app.use(notFoundHandler);

app.use(logErrors);
app.use(wrapError);
app.use(errorHandlers);
// app.use(cors());
function setupCORS(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key');
  res.header('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
      res.status(200).end();
  } else {
      next();
  }
}
app.all('/*', setupCORS);
app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});