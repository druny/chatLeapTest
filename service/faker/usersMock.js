const User = require('../../model/User');

module.exports.execute = data => {
  const user = new User({
    name: data.name(),
  });

  return user.save();
};
