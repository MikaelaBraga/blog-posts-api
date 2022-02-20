const jwt = require('../utils/jwt');
const { User } = require('../models');
const errorConstructor = require('../utils/errorConstructor');

const createLogin = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw errorConstructor('invalidFields', 'Invalid fields');

  const token = jwt.sign({ email });

  return token;
};

module.exports = { createLogin };