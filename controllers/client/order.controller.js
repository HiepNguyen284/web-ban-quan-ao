const Product = require('../../models/product.model');
const Order = require('../../models/order.model');
const Cart = require('../../models/cart.model');

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

  res.render('client/pages/order/index.pug', {
    'title': 'Đặt hàng',
    products: cart.products
  })
}

module.exports.create = async (req, res) => {
  const cart = res.locals.cart;
  const user = res.locals.user;

  const userInfo = {
    fullName: req.body.fullName,
    address: req.body.address,
    phone: req.body.phone,
    note: req.body.note
  }

  var totalAmount = 0;

  const products = cart.products.filter(product => product.checkout === true);
  for (const product of products) {
    var record = await Product.findOne({ _id: product.product_id });
    const price = productHelper.addNewPrice(record);
    
    // Tính tổng tiền cho đơn hàng
    totalAmount += price * product.quantity;
  }

  if(req.body.deliveryMethod === 'Giao tận nơi') {
    totalAmount += 30000;
  }

  const order = new Order({
    user_id: user.id,
    userInfo: userInfo,
    products: products,
    payment: req.body.payment,
    deliveryMethod: req.body.deliveryMethod,
    totalAmount: totalAmount
  });

  try {
    await order.save();
    req.flash('success', 'Đặt hàng thành công');

    // Xóa những sản phẩm đã đặt trong giỏ hàng
    try {
      await Cart.updateMany({_id: cart.id}, {
        $pull: { products: { checkout: true } }
      })
    } catch(error) {}

    // Trừ số lượng sản phẩm còn lại
    try {
      for(const product of products) {
        await Product.updateOne({_id: product.product_id, 'sizes.size': product.size}, {
          $inc: { 'sizes.$.stock': -product.quantity }
        })
      }
    } catch(error) {}

  } catch(error) {
    req.flash('error', error);
  }

  res.redirect('/orders/list-order');
}

module.exports.listOrder = async (req, res) => {
  const user = res.locals.user;

  const orders = await Order.find({
    user_id: user.id,
    received: false
  }).sort({_id: -1});

  for(const order of orders) {
    var total = 0;
    for (const product of order.products) {
      var record = await Product.findOne({ _id: product.product_id });
      record.newPrice = productHelper.addNewPrice(record);
      product.detail = record;
      total += product.detail.newPrice * product.quantity;
    }
    order.total = total;
    if(order.deliveryMethod === 'Giao tận nơi') {
      order.total += 30000;
    }
  }

  res.render('client/pages/order/list-order.pug', {
    title: 'Danh sách đơn hàng',
    orders: orders
  })
}

module.exports.historyOrder = async (req, res) => {
  const user = res.locals.user;

  const orders = await Order.find({
    user_id: user.id,
    received: true
  });

  for(const order of orders) {
    // Sửa trạng thái thành Đã thanh toán
    await Order.updateOne({_id: order.id}, {payment: true});

    var total = 0;
    for (const product of order.products) {
      var record = await Product.findOne({ _id: product.product_id });
      record.newPrice = productHelper.addNewPrice(record);
      product.detail = record;
      total += product.detail.newPrice * product.quantity;
    }
    order.total = total;
    if(order.deliveryMethod === 'Giao tận nơi') {
      order.total += 30000;
    }
  }

  res.render('client/pages/order/history-order.pug', {
    title: 'Danh sách đơn hàng',
    orders: orders
  })
}

module.exports.changeReceived = async (req, res) => {
  const id = req.params.id;

  try {
    await Order.updateOne({_id: id}, {received: true, payment: true});
  } catch(error) {}

  res.redirect('/orders/history-order');
}

module.exports.buyNow = async (req, res) => {
  const user = res.locals.user;

  const userInfo = {
    fullName: req.body.fullName,
    address: req.body.address,
    phone: req.body.phone,
    note: req.body.note
  }

  const id = req.params.id;
  const size = req.params.size;
  const quantity = req.params.quantity;

  const record = await Product.findOne({_id: id});
  record.newPrice = productHelper.addNewPrice(record);

  var totalAmount = record.newPrice * quantity;

  const products = [
    {
      product_id: id,
      size: size,
      quantity: quantity
    }
  ]

  const order = new Order({
    user_id: user.id,
    userInfo: userInfo,
    products: products,
    payment: req.body.payment,
    deliveryMethod: req.body.deliveryMethod,
    totalAmount: totalAmount
  });

  try {
    await order.save();
    req.flash('success', 'Đặt hàng thành công');

    // Trừ số lượng sản phẩm còn lại
    try {
      for(const product of products) {
        await Product.updateOne({_id: product.product_id, 'sizes.size': product.size}, {
          $inc: { 'sizes.$.stock': -product.quantity }
        })
      }
    } catch(error) {}

  } catch(error) {
    req.flash('error', error);
  }

  res.redirect('/orders/list-order');
}
