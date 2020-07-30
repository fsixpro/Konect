const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const normalize = require('normalize-url');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  gender: {
    type: String,
    //required: true,
    enum: ['male', 'female'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre('save', async function (next) {
  this.avatar = normalize(
    gravatar.url(this.email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    }),
    { forceHttps: true }
  );
  next();
});

module.exports = mongoose.model('users', userSchema);
