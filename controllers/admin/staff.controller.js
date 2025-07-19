const Account = require('../../models/account.model');
const Role = require('../../models/role.model');

const accountHelper = require('../../helpers/account.helper');

module.exports.index = async (req, res) => {
  if(res.locals.role.permissions.includes('staff_view')) {
    const accounts = await Account.find({deleted: false});
    const roles = await Role.find({deleted: false});

    for(const account of accounts) {
      account.role_name = await accountHelper.getTenChucVu(account);
    }

    res.render('admin/pages/staff/index.pug', {
      title: 'Quản lý nhân viên',
      staffs: accounts,
      roles: roles
    })
  } else {
    res.send('Bạn không có quyền xem danh sách nhân viên')
  }
}

module.exports.changeRole = async (req, res) => {
  if(res.locals.role.permissions.includes('staff_edit')) {
    const account_id = req.params.account_id;
    const role_id = req.params.role_id;

    try {
      await Account.updateOne({_id: account_id}, {role_id: role_id});
      req.flash('success', 'Cập nhật thành công');
    } catch(error) {
      req.flash('error', error);
    }

    res.redirect('back');
  } else {
    res.send('Bạn không có quyền thay đổi chức vụ')
  }
}

module.exports.delete = async (req, res) => {
  if(res.locals.role.permissions.includes('staff_delete')) {
    const id = req.params.id;

    try {
      await Account.updateOne({_id: id}, {deleted: true});
      req.flash('error', 'Đã xóa thành công');
    } catch(error) {
      req.flash('error', error)
    }

    res.redirect('back');
  } else {
    res.send('Bạn không có quyền xóa nhân viên');
  }
}

module.exports.changeStatus = async (req, res) => {
  if(res.locals.role.permissions.includes('staff_edit')) {
    const id = req.params.id;

    try {
      await Account.updateOne({_id: id}, {status: true});
      req.flash('success', 'Đã duyệt tài khoản');
    } catch(error) {
      req.flash('error', error);
    }

    res.redirect('back');
  } else {
    res.send('Bạn không có quyền duyệt nhân viên');
  }
}

module.exports.detail = async (req, res) => {
  const id = req.params.id;
  if(res.locals.role.permissions.includes('staff_view') || res.locals.account.id === id) {

    const account = await Account.findOne({_id: id});
    account.role_name = await accountHelper.getTenChucVu(account);

    res.render('admin/pages/staff/detail.pug', {
      title: 'Chi tiết nhân viên',
      account: account
    })
  } else {
    res.send('Bạn không có quyền xem thông tin nhân viên');
  }
}

module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const account = await Account.findOne({_id: id});
  account.role_name = await accountHelper.getTenChucVu(account);

  res.render('admin/pages/staff/edit.pug', {
    title: 'Chỉnh sửa thông tin',
    account: account
  })
}

module.exports.editAccount = async (req, res) => {
  const id = req.params.id;
  if(res.locals.account.id === id || res.locals.role.name === 'Chủ cửa hàng') {
    try {
      await Account.updateOne({_id: id}, req.body);
      req.flash('success', 'Cập nhật thành công');
    } catch(error) {
      req.flash('error', error);
    }
    res.redirect('back');
  } else {
    res.send('Bạn không có quyền chỉnh sửa');
  }
}