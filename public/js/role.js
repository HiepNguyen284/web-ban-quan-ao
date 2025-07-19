// Modal xóa chức vụ
function confirmDelete(id) {
  Swal.fire({
    title: 'Bạn có chắc muốn xóa chức vụ này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Xác nhận',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      const path = `/admin/roles/delete/${id}?_method=DELETE`;
      const formDeleteRole = document.querySelector('[form-delete-role]');
      formDeleteRole.action = path;
      formDeleteRole.submit();
    }
  });
}

// Xử lý phân quyền
const buttonEditPermissions = document.querySelector('[btn-edit-permissions]');
if(buttonEditPermissions) {
  buttonEditPermissions.addEventListener('click', (e) => {
    const tablePermissions = document.querySelector('[table-permissions]');
    if(tablePermissions) {
      const permissions = [];
      const rows = tablePermissions.querySelectorAll('[data-name]');
      rows.forEach(row => {
        const dataName = row.getAttribute('data-name');
        if(dataName === 'id') {
          const inputs = row.querySelectorAll('[role-id]');
          inputs.forEach(input => {
            permissions.push({
              id: input.value,
              permissions: []
            })
          })
        } else {
          const checkboxs = row.querySelectorAll('[permission]');
          checkboxs.forEach((checkbox, index) => {
            if(checkbox.checked) {
              permissions[index].permissions.push(dataName);
            }
          })
        }
      })
      
      // Gửi dữ liệu tới server
      const formEditPermissions = document.querySelector('[form-edit-permissions]');
      const inputEditPermissions = document.querySelector('[input-edit-permissions]');
      inputEditPermissions.value = JSON.stringify(permissions);
      formEditPermissions.submit();
    }
  })
}