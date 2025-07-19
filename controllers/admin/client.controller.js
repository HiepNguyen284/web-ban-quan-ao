const User = require('../../models/user.model');
const Order = require('../../models/order.model');

module.exports.index = async (req, res) => {
  if(res.locals.role.permissions.includes('client_view')) {
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

    res.render('admin/pages/client/index.pug', {
      title: 'Quản lý khách hàng',
      users: users
    })
  } else {
    res.send('Bạn không có quyền xem danh sách khách hàng');
  }
}

module.exports.delete = async (req, res) => {
  if(res.locals.role.permissions.includes('client_delete')) {
    const id = req.params.id;
    try {
      await User.updateOne({_id: id}, {deleted: true});
      req.flash('error', 'Xóa khách hàng thành công');
    } catch(error) {
      req.flash('error', error);
    }

    res.redirect('back');
  } else {
    res.send('Bạn không có quyền xóa khách hàng')
  }
}
