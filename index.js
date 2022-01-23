const cors = require('cors');
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
app.use(cors());
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});