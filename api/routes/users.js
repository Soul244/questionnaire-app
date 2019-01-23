const express = require('express');

const router = express.Router();
const UserController = require('../controllers/user-controller');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', UserController.Post_Signup);
router.post('/login', UserController.Post_Login);
router.post('/token', UserController.Token_Control);
router.post('/reset-password', UserController.Reset_Password);
router.get('/:userId', UserController.Get_User);

/*
router.delete('/:userId', checkAuth UserController.Delete_User);
*/
module.exports = router;
