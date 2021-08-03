const { responseCodeEnum } = require('../constants');

module.exports = {
  identificationUser: (req, res, next) => {
    try {
      res
        .status(responseCodeEnum.SUCCESS)
        .json(req.user);
    } catch (e) {
      next(e);
    }
  }
};
