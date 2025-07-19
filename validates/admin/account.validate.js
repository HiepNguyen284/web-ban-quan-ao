const Account = require('../../models/account.model');

module.exports.register = async (req, res, next) => {
  const account = await Account.findOne({email: req.body.email});

  if(account) {
    req.flash('error', 'Email đã tồn tại');
    res.redirect('back');
    return ;
  }

  if(!req.body.fullName) {
    req.flash('error', 'Vui lòng nhập họ tên');
    res.redirect('back');
    return ;
  }
  if(!req.body.email) {
    req.flash('error', 'Vui lòng nhập email');
    res.redirect('back');
    return ;
  }
  if(!req.body.password) {
    req.flash('error', 'Vui lòng nhập mật khẩu');
    res.redirect('back');
    return ;
  }
  if(!req.body['confirm-password']) {
    req.flash('error', 'Vui lòng xác nhận mật khẩu');
    res.redirect('back');
    return ;
  }

  if(req.body.password !== req.body['confirm-password']) {
    req.flash('error', 'Xác nhận lại mật khẩu không khớp');
    res.redirect('back');
    return ;
  }

  if(!req.body.phone) {
    req.flash('error', 'Vui lòng nhập số điện thoại');
    res.redirect('back');
    return ;
  }

  if(!req.body.address) {
    req.flash('error', 'Vui lòng nhập địa chỉ');
    res.redirect('back');
    return ;
  }

  next();
}

module.exports.edit = async (req, res, next) => {
  if(!req.body.fullName) {
    req.flash('error', 'Vui lòng nhập họ tên');
    res.redirect('back');
    return ;
  }

  next();
}

module.exports.login = async (req, res, next) => {
  if(!req.body.email) {
    req.flash('error', 'Vui lòng nhập email');
    res.redirect('back');
    return ;
  }
  if(!req.body.password) {
    req.flash('error', 'Vui lòng nhập mật khẩu');
    res.redirect('back');
    return ;
  }

  next();
}