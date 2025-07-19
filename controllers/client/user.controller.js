const User = require('../../models/user.model');
const Cart = require('../../models/cart.model');

const md5 = require('md5');

module.exports.login = async (req, res) => {

  res.render('client/pages/user/login.pug', {
    title: 'Đăng nhập'
  })
}

module.exports.loginUser = async (req, res) => {
  const user = await User.findOne({email: req.body.email, password: md5(req.body.password)});

  if(user.deleted) {
    req.flash('error', 'Tài khoản đã bị khóa');
    res.redirect('back');
    return ;
  }

  if(user) {
    req.flash('success', 'Đăng nhập thành công');
    res.cookie('tokenUser', user.tokenUser);
    res.redirect('/');
  } else {
    req.flash('error', 'Tài khoản hoặc mật khẩu không chính xác');
    res.redirect('back');
  }
}

module.exports.register = async (req, res) => {

  res.render('client/pages/user/register.pug', {
    title: 'Đăng ký tài khoản'
  })
}

module.exports.registerUser = async (req, res) => {
  req.body.password = md5(req.body.password);
  const user = new User(req.body);

  try {
    await user.save();

    // Khi đăng ký thành công, tạo giỏ hàng cho user
    const cart = new Cart({user_id: user.id, products: []});
    try {
      await cart.save();
    } catch(error) {
      console.log(error);
    }

    req.flash('success', 'Đăng ký tài khoản thành công');
    res.cookie('tokenUser', user.tokenUser);
    res.redirect('/');
    return ;
  } catch(error) {
    req.flash('error', error);
  }

  res.redirect('back')
}

module.exports.profile = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({_id: id});

  res.render('client/pages/user/profile.pug', {
    title: 'Thông tin tài khoản',
    user: user
  })
}

module.exports.edit = async (req, res) => {
  const id = req.params.id;
  
  try {
    await User.updateOne({_id: id}, req.body);
    req.flash('success', 'Cập nhật thành công');
  } catch(error) {
    req.flash('error', error);
  }

  res.redirect('back');
}

module.exports.logout = async (req, res) => {
  res.clearCookie('tokenUser');
  req.flash('success', 'Đăng xuất thành công');

  res.redirect('/');
}