const bcrypt = require('bcrypt');

module.exports = {

  compare: async (hashedPassword, password) => {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatched) {
      throw new Error('Wrong email or password😃');
    }
  },
  hash: (password) => bcrypt.hash(password, 10)

};
