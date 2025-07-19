const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const categorySchema = new mongoose.Schema({
  name: String,
  thumbnail: String,
  parent_id: String,
  gender: String,
  description: String,
  status: String,
  deleted: {
    type: String,
    default: false
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true
  }
});

const Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;