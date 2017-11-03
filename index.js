require('./service/mongo');
require('./service/queue/process');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const kue = require('kue');
const shedule = require('node-schedule');

const Job = require('./model/Job');
const createJobs = require('./service/queue/create');

shedule.scheduleJob('0 * * * *', () => (
  Job.find({})
    .populate('users')
    .then(createJobs)
    .catch(console.log)
));

kue.app.listen(3000);

cluster.on('death', worker => {
  console.log('worker pid:' + worker.pid + ' died!'.bold.red);
});
