module.exports.convertAttribute = (req) => {
  if(req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  return req.body;
}

module.exports.getNameCategoryParent = (parent_id, categories) => {
  const category = categories.find(item => item.id === parent_id);

  return category ? category.name : 'Danh mục gốc';
}

module.exports.findCategoryChild = (categories) => {
  const result = [];
  const findChild = (parent_id) => {
    const child = [];
    categories.forEach(category => {
      if(category.parent_id === parent_id) {
        category.children = findChild(category.id);
        child.push(category);
      }
    })
    return child;
  }

  categories.forEach(category => {
    if(category.parent_id === '') {
      category.children = findChild(category.id);
      result.push(category);
    }
  })
  
  return result;
}