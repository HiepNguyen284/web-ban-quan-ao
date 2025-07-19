const Contact = require('../../models/contact.model');

module.exports.index = async (req, res) => {

  res.render('client/pages/contact/index.pug', {
    title: 'Trang liên hệ'
  })
}

module.exports.sendContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    req.flash('success', 'Gửi liên hệ thành công. Hãy chờ nhân viên liên hệ lại');
  } catch(error) {
    req.flash('error', error);
  }

  res.redirect('back');
}