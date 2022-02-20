const jwt = require('../utils/jwt');
const { User } = require('../models');
const errorConstructor = require('../utils/errorConstructor');

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  
  if (user) throw errorConstructor('conflicts', 'User already registered');

  return user;
};

const createUser = async ({ displayName, email, password, image }) => {
  await getUserByEmail(email);
  await User.create({ displayName, email, password, image });

  const token = jwt.sign({ email });
  console.log(token);

  return true;
};

module.exports = { createUser };
