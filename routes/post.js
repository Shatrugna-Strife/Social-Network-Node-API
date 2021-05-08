const express = require('express');
const postController = require('../controllers/post');
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const validator = require('../validator'); // no need to mention for index.js it automatically searches for it

const router = express.Router();

router.get('/', authController.requireSignin,postController.getPosts);
router.post('/post', authController.requireSignin,validator.createPostValidator, postController.createPost);

// any route containing :userId, the app will first execute userByID()
router.param("userId", userController.userById);
module.exports = {
    router
};

// module.exports = router; //the require would get function directly
// module.exports = {
//     getPosts
// }