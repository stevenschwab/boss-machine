const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = app;

const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

// Mount minionsRouter below at the '/api' path.
const minionsRouter = require('./server/minions');
app.use('/api/minions', minionsRouter);

// Mount ideasRouter below at the '/api' path.
const ideasRouter = require('./server/ideas');
app.use('/api/ideas', ideasRouter);

// Mount meetingsRouter below at the '/api' path.
const meetingsRouter = require('./server/meetings');
app.use('/api/meetings', meetingsRouter);

// This conditional is here for testing purposes:
if (!module.parent) {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
