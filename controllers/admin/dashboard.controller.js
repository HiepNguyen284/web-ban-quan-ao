const Product = require('../../models/product.model');
const Category = require('../../models/category.model');
const Order = require('../../models/order.model');
const User = require('../../models/user.model');

const productHelper = require('../../helpers/product.helper');

module.exports.index = async (req, res) => {
  if(res.locals.role.name === 'Chủ cửa hàng') {
    const products = await Product.find({deleted: false, status: 'active'});
    const categories = await Category.find({deleted: false, status: 'active'});
    const orders = await Order.find({deleted: false});

    // Sản phẩm mới nhất
    const listProductNew = await Product.find({deleted: false, status: 'active'}).limit(5).sort({_id: -1});
    // Đơn hàng gần đây
    const listOrderRecently = await Order.find({deleted: false}).limit(5).sort({_id: -1});
    // Sản phẩm bán chạy
    const listProductSold = await Product.find({deleted: false, status: 'active'}).limit(5).sort({sold: -1});

    // Top khách hàng
    const users = await User.find({deleted: false}); 
    for(const user of users) {
      const orders = await Order.find({user_id: user.id});
      var totalOrders = orders.length;
      var shippingOrders = 0;
      var totalSpend = 0;
      for(const order of orders) {
        if(order.status !== 'completed') {
          shippingOrders ++;
        }
        totalSpend += order.totalAmount;
      }
      user.totalOrders = totalOrders;
      user.shippingOrders = shippingOrders;
      user.totalSpend = totalSpend;
    }
    users.sort((a, b) => b.totalSpend - a.totalSpend)

    // Thêm tên category vào listProductNew
    for(const product of listProductNew) {
      product.nameCategory = await productHelper.getNameCategory(product.category);
    }
    // Thêm tên category vào listProductSold
    for(const product of listProductSold) {
      product.nameCategory = await productHelper.getNameCategory(product.category);
    }


    var revenue = 0;
    for(const order of orders) {
      revenue += order.totalAmount;
    }

    res.render('admin/pages/dashboard/index.pug', {
      title: 'Trang tổng quan',
      products: products,
      categories: categories,
      orders: orders,
      revenue: revenue,
      listOrderRecently: listOrderRecently,
      listProductNew: listProductNew,
      listProductSold: listProductSold,
      users: users
    })
  } else {
    res.send('Chủ cửa hàng mới được phép xem')
  }
}