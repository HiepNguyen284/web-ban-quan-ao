const Contact = require('../../models/contact.model');

module.exports.index = async (req, res) => {
  if(res.locals.role.permissions.includes('contact_view')) {
    const contacts = await Contact.find({deleted: false})

    res.render('admin/pages/contact/index.pug', {
      title: 'Quản lý liên hệ',
      contacts: contacts
    })
  } else {
    res.send('Bạn không có quyền xem liên hệ');
  }
}

module.exports.delete = async (req, res) => {
  if(res.locals.role.permissions.includes('contact_delete')) {
    const id = req.params.id;
    try {
      await Contact.updateOne({_id: id}, {deleted: true});
      req.flash('success', 'Đã xóa liên hệ thành công');
    } catch(error) {
      req.flash('error', error);
    }

    res.redirect('back');
  } else {
    res.send('Bạn không có quyền xóa liên hệ');
  }
}

module.exports.detail = async (req, res) => {
  if(res.locals.role.permissions.includes('contact_view')) {
    const id = req.params.id;
    const contact = await Contact.findOne({_id: id});

    res.render('admin/pages/contact/detail.pug', {
      title: 'Chi tiết liên hệ',
      contact: contact
    })
  } else {
    res.send('Bạn không có quyền xem chi tiết liên hệ');
  }
}

module.exports.editStatus = async (req, res) => {
  const id = req.params.id;
  try {
    await Contact.updateOne({_id: id}, {status: true});
    req.flash('success', 'Cập nhật trạng thái thành công');
  } catch(error) {
    req.flash('error', error);
  }

  res.redirect('back');
}