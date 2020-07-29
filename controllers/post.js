const Post = require('../models/Post');
const User = require('../models/User');
const Utility = require('../util/Utility');
const { post } = require('../routes/api/post');
const util = new Utility();
//@desc     Create new post
//@route    POST /api/post
//@access   private
exports.createPost = async (req, res) => {
  let valid = util.postCheck(req.body);
  if (valid != true) return util.failureResponse(res, 400, valid.msg);
  try {
    const { text } = req.body;
    const user = await User.findById(req.user.id);
    const newpost = new Post({
      user: req.user.id,
      name: user.name,
      text,
    });
    const savedPost = await newpost.save();
    return util.successResponse(res, 201, 'post created', savedPost);
  } catch (error) {
    return util.failureResponse(res, 500, 'internal server error');
  }
};

//@desc     get all posts
//@route    GET /api/post
//@access   private
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (posts.length < 1)
      return util.successResponse(res, 200, 'no post found');
    return util.successResponse(
      res,
      200,
      { msg: 'sucess', count: posts.length },
      posts
    );
  } catch (error) {
    return util.failureResponse(res, 500, 'internal server error');
  }
};

//@desc     delete post
//@route    DELETE /api/post/:id
//@access   private
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return util.failureResponse(
        res,
        400,
        `no post found with the id of ${req.params.id}`
      );

    if (post.user.toString() != req.user.id)
      return util.failureResponse(res, 401, 'unathorized action');
    await post.remove();
    return util.successResponse(res, 200, 'post deleted');
  } catch (error) {
    if (error.kind == 'ObjectId')
      return util.failureResponse(
        res,
        400,
        `no post found with the id of ${req.params.id}`
      );
    return util.failureResponse(res, 500, 'internal server error');
  }
};

//@desc     vote a post
//@route    put /api/post/vote/:id
//@access   private
exports.votePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return util.failureResponse(
        res,
        400,
        `no post found with the id of ${req.params.id}`
      );
    const vote = post.votes.filter(
      vote => vote.user.toString() === req.user.id
    );

    if (vote.length === 0) {
      post.votes.unshift({ user: req.user.id });
      await post.save();
      return util.successResponse(res, 200, 'vote', post.votes.length);
    }
    if (vote.length > 0) {
      const spliceIndex = post.votes
        .map(vote => vote.user)
        .indexOf(req.user.id);

      post.votes.splice(spliceIndex, 1);
      await post.save();
      return util.successResponse(res, 200, 'unvote', post.votes.length);
    }

    console.log(vote.length);
  } catch (error) {
    if (error.kind == 'ObjectId')
      return util.failureResponse(
        res,
        400,
        `no post found with the id of ${req.params.id}`
      );
    return util.failureResponse(res, 500, 'internal server error');
  }
};

//@desc     comment on a post
//@route    PUT /api/post/comment/:id
//@access   private
exports.commentPosts = async (req, res) => {
  let valid = util.commentCheck(req.body);
  if (valid != true) return util.failureResponse(res, 400, valid.msg);
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user.id);
    if (!post)
      return util.failureResponse(
        res,
        400,
        `no post found with the id of ${req.params.id}`
      );
    post.comments.unshift({
      user: req.user.id,
      text,
      name: user.name,
    });
    await post.save();
    return util.successResponse(res, 201, 'comment added', post);
  } catch (error) {
    console.log(error);
    if (error.kind == 'ObjectId')
      return util.failureResponse(
        res,
        400,
        `no post found with the id of ${req.params.id}`
      );
    return util.failureResponse(res, 500, 'internal server error');
  }
};

//@desc     delete comme on a post
//@route    DELETE /api/post/comment/:id/:comment_id
//@access   private
exports.deleteComment = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    if (error.kind == 'ObjectId')
      return util.failureResponse(
        res,
        400,
        `no post found with the id of ${req.params.id}`
      );
    return util.failureResponse(res, 500, 'internal server error');
  }
};
