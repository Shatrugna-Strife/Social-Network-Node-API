const express = require('express');
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const validator = require("../validator");
// const validator = require('../validator'); // no need to mention for index.js it automatically searches for it

const router = express.Router();

// router.get('/', postController.getPosts);
router.get('/users',userController.allUsers);
router.get('/user/:userId', authController.requireSignin,userController.getUser);
router.put('/user/:userId', authController.requireSignin,userController.hasAuthorization,userController.updateUser);
router.delete('/user/:userId', authController.requireSignin,userController.hasAuthorization,userController.deleteUser);
//router.put('/user/:userId', authController.requireSignin,userController.updateUser);

// any route containing :userId, the app will first execute userByID()
router.param("userId", userController.userById);

module.exports = {
    router
};

// module.exports = router; //the require would get function directly
// module.exports = {
//     getPosts
// }