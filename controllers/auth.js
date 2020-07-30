const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Utility = require('../util/Utility');
const util = new Utility();

//@desc     Register a user
//@route    POST api/auth/register
//@access   public
exports.register = async (req, res) => {
  try {
    let valid = util.registerCheck(req.body);
    if (valid != true) return util.failureResponse(res, 400, valid.msg);
    const { name, email, password, gender } = req.body;
    const user = await User.findOne({ email });
    if (user)
      return util.failureResponse(res, 400, 'email has been registered');
    const newuser = new User({
      name,
      email,
      password,
      gender,
    });
    const savedUser = await newuser.save();

    return util.successResponse(
      res,
      201,
      'registration successfull',
      savedUser
    );
  } catch (error) {
    console.log(error);
    return util.failureResponse(res, 500, 'internal server error');
  }
};

//@desc     Login a user
//@route    POST api/auth/login
//@access   public
exports.login = async (req, res) => {
  try {
    let valid = util.loginCheck(req.body);
    if (valid != true) return util.failureResponse(res, 400, valid.msg);
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) return util.failureResponse(res, 400, 'Account not registered');
    const matchPassword = await bcrypt.compare(password, user.password);
    const payload = {
      user: {
        id: user.id,
      },
    };

    if (!matchPassword)
      return util.failureResponse(res, 400, 'invalid password');
    const token = await jwt.sign(payload, process.env.JWT_SECRET);
    return util.successResponse(res, 200, 'login success', {
      token,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return util.failureResponse(res, 500, 'internal server error');
  }
};

//@desc     Delete a user
//@route    DELETE api/auth/delete
//@access   private
exports.deleteuser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return util.failureResponse(
        res,
        400,
        `no account found with the id of ${req.user.id}`
      );
    await user.remove();
    return util.successResponse(res, 200, 'Accound deleted successfully');
  } catch (error) {
    return util.failureResponse(res, 500, 'internal server error');
  }
};

//@desc     Get logged in user
//@route    POST api/auth/getme
//@access   private
exports.getLoggedUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return util.failureResponse(
        res,
        400,
        `no account found with the id of ${req.user.id}`
      );

    return util.successResponse(res, 200, 'success', user);
  } catch (error) {
    return util.failureResponse(res, 500, 'internal server error');
  }
};
