// Xóa danh mục
// const btnDeleteCategories = document.querySelectorAll('[btn-delete-category]');
// if(btnDeleteCategories) {
//   btnDeleteCategories.forEach(btnDeleteCategory => {
//     btnDeleteCategory.addEventListener('click', (e) => {
//       const id = btnDeleteCategory.getAttribute('category-id');
//       const path = `/admin/categories/delete/${id}?_method=DELETE`;
//       const formDeleteCategory = document.querySelector('[form-delete-category]');
//       formDeleteCategory.action = path;
//       formDeleteCategory.submit();
//     })
//   });
// }
// Modal xác nhận xóa 
function confirmDelete(id) {
  Swal.fire({
    title: 'Bạn có chắc muốn xóa danh mục này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Xác nhận',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      const path = `/admin/categories/delete/${id}?_method=DELETE`;
      const formDeleteCategory = document.querySelector('[form-delete-category]');
      formDeleteCategory.action = path;
      formDeleteCategory.submit();
    }
  });
}