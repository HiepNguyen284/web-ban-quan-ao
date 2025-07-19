const md5 = require('md5');
const Account = require('../../models/account.model');

module.exports.login = async (req, res) => {

  res.render('admin/pages/account/login.pug', {
    title: 'Trang đăng nhập'
  })
}

module.exports.loginAccount = async (req, res) => {
  const account = await Account.findOne({email: req.body.email, password: md5(req.body.password), deleted: false});

  if(account && account.status === false) {
    req.flash('error', 'Tài khoản của bạn chưa được duyệt');
    res.redirect('back');
    return ;
  }

  if(account) {
    req.flash('success', 'Đăng nhập thành công');
    req.session.accountId = account.id;
    if(account.role_id === '682b4a68f1ffc75cef94b9c5') {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/admin/products');
    }
  } else {
    req.flash('error', 'Tài khoản hoặc mật khẩu không chính xác');
    res.redirect('back');
  }

}

module.exports.register = async (req, res) => {

  res.render('admin/pages/account/register.pug', {
    title: 'Trang đăng ký'
  })
}

module.exports.registerAccount = async (req, res) => {
  req.body.password = md5(req.body.password);

  try {
    const account = new Account(req.body);
    await account.save();
    req.flash('success', 'Gửi yêu cầu thành công. Hãy chờ quản lý duyệt tài khoản');
    res.redirect('/admin/account/login');
    return ;
  } catch(error) {
    req.flash('error', error);
  }

  res.redirect('back');
}

module.exports.logout = async (req, res) => {
  req.session.accountId = null;
  req.flash('success', 'Đăng xuất thành công');
  res.redirect('/admin/account/login');
};

module.exports.profile = async (req, res) => {
  
  res.render('admin/pages/account/profile.pug', {
    title: 'Thông tin cá nhân'
  })
}