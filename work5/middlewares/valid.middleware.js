const { userValidator } = require('../validators');

module.exports = {

  checkUserCreateValidity: (req, res, next) => {
    try {
      const { error } = userValidator.createUser.validate(req.body);

      if (error) {
        throw new Error(error.details[0].message);
      }
      next();
    } catch (e) {
      res.json(e.message);
    }
  }
};
