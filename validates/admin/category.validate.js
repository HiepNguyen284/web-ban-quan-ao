module.exports.fillInfo = async (req, res, next) => {
  if(!req.body.name) {
    req.flash('error', 'Vui lòng nhập tên danh mục');
    res.redirect('back');
    return ;
  }

  if(!req.body.gender) {
    req.flash('error', 'Vui lòng chọn giới tính');
    res.redirect('back');
    return ;
  }

  next();
}