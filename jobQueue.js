const kue = require('kue');
const queue = kue.createQueue();

function newJob(data) {
  const { message = 'defaultMessage', pushTime = [19, 1, 0], type = 'local' } = data;

  const now = new Date();
  now.setHours(...pushTime);
  console.log(new Date(now));

  const job = queue
    .create('userJob', data)
    .removeOnComplete(true)
    .delay(now);

  job
    .on('complete', () => console.log(`Job ${job.id} with message ${job.data.message} is done`))
    .on('remove', () => console.log(`Job ${job.id} with message ${job.data.message} is removed`))
    .on('failed', () => console.log(`Job ${job.id} with message ${job.data.message} has failed`));

  job.save();
}

queue.process('userJob',  5, (job, done) => {
  console.log(`Job ${job.id} is done`);
  console.log(`Hi ${job.data.users}, it\'s time ${Date()}`);
  done && done();
});

let count = 0;

// setInterval(() => {
//   if (count <= 10000) {
//     newJob({
//       users: [123, 3434],
//       type: 'local',
//       message: 'Test Message',
//       pushTime: [19, 24, 0],
//     });
//     count++;
//   }
// }, 3);
newJob({
  users: [123, 3434],
  type: 'local',
  message: 'Test Message',
  pushTime: [19, 24, 0],
});
kue.app.listen(3000);
