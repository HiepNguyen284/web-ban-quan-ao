const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');

const productHelper = require('../../helpers/product.helper');

module.exports.index = async (req, res) => {
  const cart = res.locals.cart;

  for (const product of cart.products) {
    var record = await Product.findOne({ _id: product.product_id });
    record.newPrice = productHelper.addNewPrice(record);
    product.detail = record;
    record.sizes.forEach(object => {
      if(object.size === product.size) {
        product.detail.stock = object.stock;
      }
    })
  }

  res.render('client/pages/cart/index.pug', {
    title: 'Giỏ hàng',
    products: cart.products
  });
}

module.exports.addProductInCart = async (req, res) => {
  const cart = res.locals.cart;

  const index = cart.products.findIndex(product => product.product_id === req.body.product_id && product.size === req.body.size);

  // Lấy ra số lượng còn lại của sản phẩm
  const product = await Product.findOne({_id: req.body.product_id});
  const objectSize = product.sizes.find(object => {
    return object.size === req.body.size
  })

  if(index === -1) {
    // Chưa có sản phẩm đó trong giỏ hàng -> Thêm mới sản phẩm
    try {
      await Cart.updateOne({_id: cart.id}, {
        $push: {products: req.body}
      })
      req.flash('success', 'Đã thêm vào giỏ hàng')
    } catch(error) {
      console.log(error);
      req.flash('error', error);
    }
  } else {
    // Đã có sản phẩm đó trong giỏ hàng -> Cập nhật số lượng
    const quantity = cart.products[index].quantity;
    try {
      await Cart.updateOne(
        { _id: cart.id, products: {
          $elemMatch: { 
            product_id: req.body.product_id, 
            size: req.body.size 
          } 
        } },
        { $inc: { 'products.$.quantity': Math.min(req.body.quantity, objectSize.stock-quantity) } }
      );
      req.flash('success', 'Đã thêm vào giỏ hàng')
    } catch(error) {
      console.log(error);
      req.flash('error', error);
    }
  }

  res.redirect('back');
}

module.exports.deteleProductInCart = async (req, res) => {
  const cart = res.locals.cart;
  const product_id = req.body.product_id;
  const size = req.body.size;

  try {
    await Cart.updateOne({_id: cart.id}, {
      $pull: { products: { product_id: product_id, size: size } }
    });
    req.flash('error', 'Đã xóa thành công');
  } catch(error) {
    req.flash('error', error);
  }

  res.redirect('back');
}

module.exports.editQuantityProductInCart = async (req, res) => {
  const cart = res.locals.cart;
  const {product_id, size, quantity} = req.query;

  try {
    await Cart.updateOne({_id: cart.id, products: {
        $elemMatch: {
          product_id: product_id,
          size: size
        }
      }
    },
    {
      $set: {
        'products.$.quantity': quantity
      }
    }
  );
    req.flash('success', 'Cập nhật số lượng thành công')
  } catch(error) {
    req.flash('error', error);
  }

  res.redirect('back');
}

module.exports.editSizeProductInCart = async (req, res) => {
  const cart = res.locals.cart;
  const {product_id, size, quantity, oldSize} = req.query;

  const index = cart.products.findIndex(product => product.product_id === product_id && product.size === size);

  // Lấy ra số lượng còn lại của từng size 
  const product = await Product.findOne({_id: product_id});
  const objectSizeNew = product.sizes.find(object => {
    return object.size === size
  })

  if(index === -1) {
    // Chưa có sản phẩm + size này trong giỏ hàng -> Tạo mới
    try {
      await Cart.updateOne(
        {
          _id: cart.id,
          'products.product_id': product_id
        },
        {
          $set: {
            'products.$.size': size,
            'products.$.quantity': Math.min(quantity, objectSizeNew.stock)
          }
        }
      );
      req.flash('success', 'Cập nhật size thành công')
    } catch(error) {
      req.flash('error', error);
    }
  } else {
    const oldQuantity = cart.products[index].quantity;
    // Nếu đã có sản phẩm + size này trong giỏ hàng rồi -> Cập nhật số lượng
    try {
      await Cart.updateOne({_id: cart.id, products: {
          $elemMatch: {
            product_id: product_id,
            size: size
          }
        }
      },
      {
        $inc: {
          'products.$.quantity': Math.min(quantity, objectSizeNew.stock-oldQuantity)
        }
      }
    );
      req.flash('success', 'Cập nhật số lượng thành công')
    } catch(error) {
      req.flash('error', error);
    }
    // Sau khi cập nhật số lượng -> Xóa sản phẩm cũ
    try {
      await Cart.updateOne({_id: cart.id}, {
        $pull: { products: { product_id: product_id, size: oldSize } }
      });
    } catch(error) {
      req.flash('error', error);
    }
  }

  res.redirect('back');
}

module.exports.editCheckoutProductInCart = async (req, res) => {
  const cart = res.locals.cart;
  const {product_id, size, checkout} = req.query;

  try {
    await Cart.updateOne({_id: cart.id, products: {
          $elemMatch: {
            product_id: product_id,
            size: size
          }
        }
      },
      {
        $set: {
          'products.$.checkout': checkout
        }
      }
    );
    if(checkout === 'true') {
      req.flash('success', 'Đã thêm sản phẩm vào đơn hàng');
    } else {
      req.flash('error', 'Đã xóa sản phẩm khỏi đơn hàng')
    }
  } catch(error) {
    req.flash('error', error);
  }

  res.redirect('back');
}

module.exports.checkoutAllProductInCart = async (req, res) => {
  const cart = res.locals.cart;
  const checkout = req.query.checkout;

  try {
    await Cart.updateOne(
      { _id: cart.id },
      {
        $set: {
          "products.$[].checkout": checkout
        }
      }
    );
    if(checkout === 'true') {
      req.flash('success', 'Đã thêm tất cả sản phẩm vào đơn hàng');
    } else {
      req.flash('error', 'Đã xóa tất cả sản phẩm khỏi đơn hàng')
    }
  } catch(error) {
    req.flash('error', error);
  }

  res.redirect('back');
}