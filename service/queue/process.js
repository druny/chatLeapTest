const kue = require('kue');
const logToFile = require('../log/toFile');

const queue = kue.createQueue();
const countListeners = 150;

queue.setMaxListeners(countListeners);

console.log('[KueProcess] listening');

module.exports = queue.process('userJob',  countListeners, async (job, done) => {
  const fileWritePromises = [];

  job
    .on('complete', () => console.log(`Job ${job.id} with message ${job.data.message} is done`))
    .on('failed', () => console.log(`Job ${job.id} with message ${job.data.message} has failed`));

  console.log(`Job ${job.id} is done`);

  for (const user of job.data.users) {
    const message = `Hi ${user.name}, it\'s time ${Date()}. ${job.data.message}`;

    fileWritePromises.push(logToFile(message));

    console.log(message);
  }

  done && done();

  Promise.all(fileWritePromises);
    // .then(res => console.log('[Written to file]', res))
    // .catch(err => console.log('[Err written to file]', err));
});