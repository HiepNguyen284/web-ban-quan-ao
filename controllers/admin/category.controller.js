const Category = require('../../models/category.model');

const categoryHelper = require('../../helpers/category.helper');

module.exports.index = async (req, res) => {
  if(res.locals.role.permissions.includes('category_view')) {

    // Xử lý tìm kiếm danh mục
    const keyword = req.query.keyword || '';

    var categories = await Category.find({deleted: false, name: {
      $regex: keyword, $options: 'i'
    }});

    categories.forEach(category => {
      category.nameCategoryParent = categoryHelper.getNameCategoryParent(category.parent_id, categories);
    })

    categories = categoryHelper.findCategoryChild(categories);

    res.locals.index = 1;

    res.render('admin/pages/category/index.pug', {
      title: 'Danh mục sản phẩm',
      categories: categories
    })
  } else {
    res.send('Bạn không có quyền xem danh mục')
  }
}

module.exports.create = async (req, res) => {
  var categories = await Category.find({deleted: false});
  categories = categoryHelper.findCategoryChild(categories);

  console.log(categories);

  res.render('admin/pages/category/create.pug', {
    title: 'Thêm mới danh mục',
    categories: categories
  })
}

module.exports.createCategory = async (req, res) => {
  if(res.locals.role.permissions.includes('category_create')) {
    req.body = categoryHelper.convertAttribute(req);

    const category = new Category(req.body);
    try {
      await category.save();
      req.flash('success', 'Thêm danh mục thành công');
    } catch(error) {
      console.log('Loi')
      req.flash('error', error);
    }

    res.redirect('/admin/categories');
  } else {
    res.send('Bạn không có quyền thêm danh mục')
  }
}

module.exports.detail = async (req, res) => {
  if(res.locals.role.permissions.includes('category_view')) {
    const id = req.params.id;
    const category = await Category.findOne({_id: id, deleted: false});
    const categories = await Category.find({deleted: false});

    category.nameCategoryParent = categoryHelper.getNameCategoryParent(category.parent_id, categories);

    res.render('admin/pages/category/detail.pug', {
      title: 'Chi tiết danh mục',
      category: category
    })
  } else {
    res.send('Bạn không có quyền xem chi tiết danh mục')
  }
}

module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const category = await Category.findOne({_id: id, deleted: false});
  var categories = await Category.find({deleted: false});
  categories = categoryHelper.findCategoryChild(categories);

  res.render('admin/pages/category/edit.pug', {
    title: 'Chỉnh sửa danh mục',
    category: category,
    categories: categories
  })
}

module.exports.editCategory = async (req, res) => {
  if(res.locals.role.permissions.includes('category_edit')) {
    const id = req.params.id;
    req.body = categoryHelper.convertAttribute(req);

    try {
      await Category.updateOne({_id: id}, req.body);
      req.flash('success', 'Cập nhật danh mục thành công')
    } catch(error) {
      req.flash('error', error);
    }

    res.redirect('/admin/categories');
  } else {
    res.send('Bạn không có quyền chỉnh sửa danh mục')
  }
}

module.exports.delete = async (req, res) => {
  if(res.locals.role.permissions.includes('category_delete')) {
    const id = req.params.id;

    try {
      await Category.updateOne({_id: id}, {deleted: true});
      req.flash('success', 'Xóa danh mục thành công');
    } catch {
      req.flash('error', error);
    }
    
    res.redirect('/admin/categories');
  } else {
    res.send('Bạn không có quyền xóa danh mục')
  }
}