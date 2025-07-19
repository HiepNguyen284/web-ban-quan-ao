const User = require('../../models/user.model');

module.exports.register = async (req, res, next) => {
  const user = await User.findOne({email: req.body.email});

  if(user) {
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