const mongo = require('../mongo');
const faker = require('faker');
const config = require('config');

const strategy = {
  'User': require('./usersMock'),
  'Job': require('./jobsMock'),
};

const countMock = config.countMock;

const fakeData = {
  User: {
    name: faker.name.firstName,
  },
  Job: {},
};

console.log(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));

switch (process.argv[2]) {
  case 'user':
    fake(countMock, 'User');
    break;
  case 'job':
    fake(countMock, 'Job');
    break;
}

async function fake(count, model) {
  try {
    for (let i = 0; i <= count; i += 1) {
      const res = await strategy[model].execute(fakeData[model], count);
      console.log(res);
    }

    mongo.disconnect();
    return true;
  } catch (e) {
    console.log('[Err]', e);
    mongo.disconnect();
  }
}
