const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { dbUri } = require('../../config');

const options = {
  useNewUrlParser: true,
  reconnectTries: 10, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

mongoose.set('useCreateIndex', true);
mongoose.connect(dbUri, options);

const pollsRoutes = require('./routes/polls');
const usersRoutes = require('./routes/users');
const participantsRoutes = require('./routes/participants');

async function api(server, config) {
  if (config.isDev) {
    // debug response times
    server.use(morgan('dev'));
  }

  server.disable('etag');

  // make json easier on ourselves (we can possibly get away with using next's parsing)
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.use('/api/polls', pollsRoutes);
  server.use('/api/users', usersRoutes);
  server.use('/api/participants', participantsRoutes);
}

module.exports = api;
