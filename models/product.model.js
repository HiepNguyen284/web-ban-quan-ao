const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  name: String,
  thumbnail: String,
  description: String,
  category: String,
  sizes: [
    {
      size: String,
      stock: Number
    }
  ],
  price: Number,
  discount: Number,
  status: String,
  featured: Boolean,
  deleted: {
    type: Boolean,
    default: false
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true
  },
  sold: {
    type: Number,
    default: 0
  }
});

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;