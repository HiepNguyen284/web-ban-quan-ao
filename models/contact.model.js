const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  title: String,
  message: String,
  deleted: {
    type: Boolean,
    default: false
  },
  status: {
    type: Boolean,
    default: false
  }
})

const Contact = mongoose.model('Contact', contactSchema, 'contacts');

module.exports = Contact;