const mongoose = require('mongoose');

const userHelper = require('../helpers/user.helper');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  address: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  tokenUser: {
    type: String,
    default: userHelper.createToken(20)
  },
  deleted: {
    type: Boolean,
    default: false
  }
})

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;

