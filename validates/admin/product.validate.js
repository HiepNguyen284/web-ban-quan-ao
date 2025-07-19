module.exports.createProduct = async (req, res, next) => {
  if(!req.body.name) {
    req.flash('error', 'Vui lòng nhập tên sản phẩm');
    res.redirect('back');
    return ;
  }

  if(!req.file) {
    req.flash('error', 'Vui lòng chọn ảnh cho sản phẩm');
    res.redirect('back');
    return ;
  }

  if(!req.body.category) {
    req.flash('error', 'Vui lòng chọn danh mục cho sản phẩm');
    res.redirect('back');
    return ;
  }

  if(!req.body.price) {
    req.flash('error', 'Vui lòng nhập giá cho sản phẩm');
    res.redirect('back');
    return ;
  }

  if(!req.body.discount) {
    req.body.discount = 0;
  }

  try {
    for (const size of req.body.sizes) {
      if (!req.body[`stock${size}`]) {
        req.flash('error', `Vui lòng nhập số lượng cho size ${size}`);
        return res.redirect('back');
      }
    }
  } catch(error) {
    const size = req.body.sizes
    if(!req.body[`stock${size}`]) {
      req.flash('error', `Vui lòng nhập số lượng cho size ${size}`);
      res.redirect('back');
      return ;
    }
  }

  next();
}

module.exports.editProduct = async (req, res, next) => {
  if(!req.body.name) {
    req.flash('error', 'Vui lòng nhập tên sản phẩm');
    res.redirect('back');
    return ;
  }

  if(!req.body.category) {
    req.flash('error', 'Vui lòng chọn danh mục cho sản phẩm');
    res.redirect('back');
    return ;
  }

  if(!req.body.price) {
    req.flash('error', 'Vui lòng nhập giá cho sản phẩm');
    res.redirect('back');
    return ;
  }

  if(!req.body.discount) {
    req.body.discount = 0;
  }

  try {
    for (const size of req.body.sizes) {
      if (!req.body[`stock${size}`]) {
        req.flash('error', `Vui lòng nhập số lượng cho size ${size}`);
        return res.redirect('back');
      }
    }
  } catch(error) {
    const size = req.body.sizes
    if(!req.body[`stock${size}`]) {
      req.flash('error', `Vui lòng nhập số lượng cho size ${size}`);
      res.redirect('back');
      return ;
    }
  }

  next();
}