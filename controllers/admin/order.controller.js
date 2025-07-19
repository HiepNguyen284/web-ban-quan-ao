const Order = require('../../models/order.model');
const Product = require('../../models/product.model');

const productHelper = require('../../helpers/product.helper');

module.exports.index = async (req, res) => {
  if(res.locals.role.permissions.includes('order_view')) {
    // Điều kiện lọc
    const filter = {deleted: false};

    // Xử lý tìm kiếm đơn hàng
    const keyword = req.query.keyword || '';
    filter['userInfo.fullName'] = { $regex: keyword, $options: 'i' }

    // Xử lý lọc trạng thái
    var status = req.query.status;
    var payment = req.query.payment;
    if(status === '1') {
      filter.status = { $eq: 'complete'};
    } else if(status === '0') {
      filter.status = { $ne: 'complete' };
    }
    if(payment === '1') {
      filter.payment = true;
    } else if(payment === '0') {
      filter.payment = false;
    }

    // Lọc theo ngày
    const from_date = req.query.from_date;
    const to_date = req.query.to_date;
    if(from_date && !to_date) {
      req.flash('error', 'Vui lòng chọn ngày kết thúc');
      res.redirect('back');
      return ;
    }
    if(!from_date && to_date) {
      req.flash('error', 'Vui lòng chọn ngày bắt đầu');
      res.redirect('back');
      return ;
    }
    if (from_date && to_date) {
      const from = new Date(from_date);
      const to = new Date(to_date);

      // Kiểm tra nếu ngày kết thúc nhỏ hơn ngày bắt đầu
      if (to < from) {
        req.flash('error', 'Ngày kết thúc không được nhỏ hơn ngày bắt đầu');
        return res.redirect('back');
      }

      // Set giờ để bao trùm hết ngày kết thúc
      to.setHours(23, 59, 59, 999);

      filter.createdAt = {
        $gte: from,
        $lte: to
      };
    }

    // Truy vấn
    const orders = await Order.find(filter).sort({_id: -1});

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

    res.render('admin/pages/order/index.pug', {
      title: 'Quản lý đơn hàng',
      orders: orders
    })
  } else {
    res.send('Bạn không có quyền xem danh sách đơn hàng')
  }
}

module.exports.changeStatus = async (req, res) => {
  if(res.locals.role.permissions.includes('order_edit')) {
    const id = req.params.id;
    const status = req.params.status;

    try {
      if(status === 'complete') {
        await Order.updateOne({_id: id}, {status: status, payment: true});
      } else {
        await Order.updateOne({_id: id}, {status: status});
      }
      req.flash('success', 'Cập nhật trạng thái thành công');
    } catch(error) {
      req.flash('error', error);
    }

    res.redirect('back');
  } else {
    res.send('Bạn không có quyền cập nhật trạng thái đơn hàng');
  }
}