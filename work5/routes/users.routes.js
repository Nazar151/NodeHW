const router = require('express').Router();

const { usersController } = require('../controllers');
const { usersMiddleware, validMiddleware } = require('../middlewares');

router.get('/', usersController.getAllUsers);
router.post('/', validMiddleware.checkUserCreateValidity, usersMiddleware.isDataCorrect,
  usersMiddleware.isUserAlreadyExist,
  usersController.createUser);

router.get('/:id', usersMiddleware.isUserExist, usersController.getUserById);
router.delete('/:id', usersMiddleware.isUserExist, usersController.deleteUser);
router.patch('/:id', usersMiddleware.isUserExist, usersMiddleware.isDataCorrect, usersController.changeUser);

module.exports = router;
