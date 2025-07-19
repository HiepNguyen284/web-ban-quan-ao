const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
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
  deleted: {
    type: Boolean,
    default: false
  },
  role_id: {
    type: String,
    default: '682b4a68f1ffc75cef94b9c6'
  },
  status: {
    type: Boolean,
    default: false
  }
})

const Account = mongoose.model('Account', accountSchema, 'accounts');

module.exports = Account;