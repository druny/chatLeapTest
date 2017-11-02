const config = require('config');
const mongoose = require('mongoose');
const  connectionConfig = { useMongoClient: true };

mongoose.Promise = Promise;

require('../model');

mongoose.connection
  .on('error', (err) => {
    console.error('[MongoDB] connection error:', err);
    process.exit(-1);
  })
  .on('open', () => console.info('[MongoDB] connected'));

mongoose.connect(config.mongo, connectionConfig);

module.exports = mongoose;
