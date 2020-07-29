class Utility {
  response(status, msg, data = {}) {
    return {
      status,
      msg,
      data,
    };
  }
  registerCheck(req) {
    if (req.name == undefined || req.name == '')
      return this.reponse(false, 'name is required');
    if (req.email == undefined || req.email == '')
      return this.reponse(false, 'email is required');
    if (req.password == undefined || req.password == '')
      return this.reponse(false, 'password is required');
    return true;
  }
  loginCheck(req) {
    if (req.email == undefined || req.email == '')
      return this.response(false, 'email is required');
    if (req.password == undefined || req.password == '')
      return this.response(false, 'password is required');
    return true;
  }

  postCheck(req) {
    if (req.text == undefined || req.text == '')
      return this.response(false, 'you can not submit an empty post');
    return true;
  }
  commentCheck(req) {
    if (req.text == undefined || req.text == '')
      return this.response(false, 'you can not submit an empty comment');
    return true;
  }
  failureResponse(res, statusCode, msg, data = {}) {
    return res.status(statusCode).json({
      status: false,
      msg,
      data,
    });
  }
  successResponse(res, statusCode, msg, data = {}) {
    return res.status(statusCode).json({
      status: true,
      msg,
      data,
    });
  }
}
module.exports = Utility;
