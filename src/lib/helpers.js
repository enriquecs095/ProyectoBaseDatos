const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
    console.log(password);
    console.log(savedPassword);
  try {
      console.log(await bcrypt.compare('toston1', savedPassword));
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

module.exports = helpers;