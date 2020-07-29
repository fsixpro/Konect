const jwt = require('jsonwebtoken');
const Utility = require('../util/Utility');
const util = new Utility();

module.exports = (req, res, next) => {
  const token = req.header('authorization');

  if (!token) {
    return util.failureResponse(res, 401, 'no token, authorization denied');
  }

  try {
    const decoded = jwt.verify(token.slice(7), process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return util.failureResponse(res, 401, 'invalid token');
  }
};
