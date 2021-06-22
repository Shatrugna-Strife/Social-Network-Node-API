const express = require('express');
const postController = require('../controllers/post');
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const validator = require('../validator'); // no need to mention for index.js it automatically searches for it

const router = express.Router();

router.get('/posts', authController.requireSignin,postController.getPosts);
router.post('/post/new/:userId', authController.requireSignin, userController.hasAuthorization, postController.createPost);//, validator.createPostValidator);
router.get('/posts/by/:userId', authController.requireSignin, postController.postsByUser);
router.delete('/post/:postId', authController.requireSignin, postController.isPoster, postController.deletePost);
router.put('/post/:postId', authController.requireSignin, postController.isPoster, postController.updatePost);
// router.post('/post/new/:userId', postController.createPost);
// router.post('/post/new', postController.createPost);

// any route containing :userId, the app will first execute userByID()
router.param("userId", userController.userById);
router.param("postId", postController.postById);
module.exports = {
    router
};

// module.exports = router; //the require would get function directly
// module.exports = {
//     getPosts
// }