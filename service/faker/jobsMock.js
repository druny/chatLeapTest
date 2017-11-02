const Job = require('../../model/Job');
const User = require('../../model/User');
const config = require('config');

module.exports.execute = async data => {
  const skip = Math.floor(Math.random() * config.countMock);
  const users = await User.find().skip(skip).limit(10).exec();

  if (!users) throw new Error('Don\'t find users');

  const job = new Job({
    users,
    type: 'local',
    status: 'inQueue',
    pushTime: randomTime(),
    message: data.message(),
  });

  return job.save();
};

const pad = number => ((number < 10) ? '0' : '') + number.toString();

function randomTime() {
  const randomMinutes = Math.floor(Math.random() * 1440);

  const HH = pad(1 + (Math.floor(randomMinutes / 60) % 24));
  const MM = pad(randomMinutes % 60);

  return [HH, MM, 0];
}
