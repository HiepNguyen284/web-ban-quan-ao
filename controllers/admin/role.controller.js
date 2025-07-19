const Role = require('../../models/role.model');

module.exports.index = async (req, res) => {
  if(res.locals.role.permissions.includes('role_view')) {
    const roles = await Role.find({deleted: false});

    res.render('admin/pages/role/index.pug', {
      title: 'Trang phân quyền',
      roles: roles
    })
  } else {
    res.send('Bạn không có quyền xem danh sách chức vụ');
  }
}

module.exports.permissions = async (req, res) => {
  const roles = await Role.find({deleted: false});

  res.render('admin/pages/role/permissions.pug', {
    title: 'Trang phân quyền',
    roles: roles
  })
}

module.exports.editPermissions = async (req, res) => {
  if(res.locals.role.permissions.includes('role_permissions')) {
    req.body.permissions = JSON.parse(req.body.permissions);
  
    try {
      for(const permissions of req.body.permissions) {
        await Role.updateOne({_id: permissions.id}, {permissions: permissions.permissions});
      }
      req.flash('success', 'Cập nhật thành công');
    } catch(error) {
      req.flash('error', error);
    }

    res.redirect('back');
  } else {
    res.send('Bạn không có quyền thay đổi phân quyền');
  }
}

module.exports.create = async (req, res) => {

  res.render('admin/pages/role/create.pug', {
    title: 'Thêm chức vụ'
  })
}

module.exports.createRole = async (req, res) => {
  if(res.locals.role.permissions.includes('role_create')) {
    const role = new Role(req.body);
    try {
      await role.save();
      req.flash('success', 'Thêm chức vụ thành công');
    } catch(error) {
      req.flash('error', error);
    }

    res.redirect('/admin/roles');
  } else {
    res.send('Bạn không có quyền thêm chức vụ');
  }
}

module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const role = await Role.findOne({_id: id});

  res.render('admin/pages/role/edit.pug', {
    title: 'Chỉnh sửa quyền',
    role: role
  })
}

module.exports.editRole = async (req, res) => {
  if(res.locals.role.permissions.includes('role_edit')) {
    const id = req.params.id;

    try {
      const role = await Role.updateOne({_id: id}, req.body);
      req.flash('success', 'Cập nhật thành công');
    } catch(error) {
      req.flash('error', error);
    }

    res.redirect('/admin/roles');
  } else {
    res.send('Bạn không có quyền sửa chức vụ');
  }
}

module.exports.delete = async (req, res) => {
  if(res.locals.role.permissions.includes('role_delete')) {
    const id = req.params.id;

    try {
      await Role.updateOne({_id: id}, {deleted: true});
      req.flash('error', 'Đã xóa chức vụ thành công');
    } catch(error) {
      req.flash('error', error);
    }

    res.redirect('back');
  } else {
    res.send('Bạn không có quyền xóa chức vụ');
  }
}