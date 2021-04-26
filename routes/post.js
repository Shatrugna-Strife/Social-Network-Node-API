const express = require('express');
const postController = require('../controllers/post');
const validator = require('../validator'); // no need to mention for index.js it automatically searches for it

const router = express.Router();

router.get('/', postController.getPosts);
router.post('/post', validator.createPostValidator, postController.createPost);

module.exports = {
    router
};

// module.exports = router; //the require would get function directly
// module.exports = {
//     getPosts
// }