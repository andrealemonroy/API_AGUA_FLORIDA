const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
const { config } = require('./config/index');
const usersApi = require('./routes/users.js');
const bandsApi = require('./routes/bands.js');


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
app.use(notFoundHandler);

app.use(logErrors);
app.use(wrapError);
app.use(errorHandlers);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});