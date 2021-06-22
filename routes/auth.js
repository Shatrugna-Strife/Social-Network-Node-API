const express = require('express');
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const validator = require("../validator");
// const validator = require('../validator'); // no need to mention for index.js it automatically searches for it

const router = express.Router();

// router.get('/', postController.getPosts);
router.post('/signup', validator.userSignupValidator,authController.signup);
router.post('/signin',authController.signin);
router.get('/signout',authController.signout);
// any route containing :userId, the app will first execute userByID()
router.param("userId", userController.userById);

module.exports = {
    router
};

// module.exports = router; //the require would get function directly
// module.exports = {
//     getPosts
// }