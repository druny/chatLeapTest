const kue = require('kue');
const queue = kue.createQueue();

function newJob(data) {
  const { pushTime = [19, 1, 0] } = data;

  const delay = new Date();
  delay.setHours(...pushTime);

  return queue
    .create('userJob', data)
    .removeOnComplete(true)
    .delay(delay)
    .save();
}

module.exports = (jobs) => {
  console.log('========================================== [Created] ==========================================');

  for (const job of jobs) {
    if (+job.pushTime[0] === new Date().getHours()) {
      newJob(job);
    }
  }
};
