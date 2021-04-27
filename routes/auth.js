const express = require('express');
const authController = require('../controllers/auth');
const validator = require("../validator");
// const validator = require('../validator'); // no need to mention for index.js it automatically searches for it

const router = express.Router();

// router.get('/', postController.getPosts);
router.post('/signup', validator.userSignupValidator,authController.signup);
router.post('/signin',authController.signin);
router.post('/signout',authController.signout);

module.exports = {
    router
};

// module.exports = router; //the require would get function directly
// module.exports = {
//     getPosts
// }