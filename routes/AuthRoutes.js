const router = require('express').Router();
const UserController = require('../controllers/UserController');
const { checkToken, authenticateUser, authorizeUser } = require('../middlewares/CheckAuth');
// const passport = require('../config/passport/passport');

router.post('/login', UserController.loginUser);
// router.post('/login', passport.authenticate('local', { session: true }));
router.post('/create-user', UserController.createUser);
router.use('/update-user/:id', checkToken, authenticateUser);
router.use('/delete-user/:id', checkToken, authenticateUser, (req, res, next) =>
	authorizeUser(['admin', 'moderator'])(req, res, next)
);
router.put('/update-user/:id', checkToken, authenticateUser, UserController.updateUserInfo);
router.delete('/delete-user/:id', UserController.deleteUser);

module.exports = router;
