const express = require('express');
const router = express.Router();
const {
  getPosts,
  createPost,
  deletePost,
  votePost,
  commentPosts,
} = require('../../controllers/post');
const auth = require('../../middleware/auth');

router.route('/').get(auth, getPosts).post(auth, createPost);
router.route('/:id').delete(auth, deletePost);
router.route('/vote/:id').put(auth, votePost);
router.route('/comment/:id').put(auth, commentPosts);

module.exports = router;
