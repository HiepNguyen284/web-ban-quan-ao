const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: String,
  description: String,
  permissions: {
    type: Array,
    default: []
  },
  deleted: {
    type: Boolean,
    default: false
  }
})

const Role = mongoose.model('Role', roleSchema, 'roles');

module.exports = Role;