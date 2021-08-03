const router = require('express').Router();

const { usersController } = require('../controllers');
const { usersMiddleware, validMiddleware } = require('../middlewares');

router.get('/', usersController.getAllUsers);
router.post('/', validMiddleware.checkUserCreateValidity, usersMiddleware.isDataCorrect,
  usersMiddleware.isUserAlreadyExist,
  usersController.createUser);

router.use('/:id', usersMiddleware.getUserByIdDynamicParam('id', 'params', '_id'));

router.get('/:id', usersController.getUserById);
router.delete('/:id', usersController.deleteUser);
router.patch('/:id', usersMiddleware.isDataCorrect, usersController.changeUser);

module.exports = router;
