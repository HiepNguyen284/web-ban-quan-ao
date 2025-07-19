// Modal xóa khách hàng
function confirmDelete(id) {
  Swal.fire({
    title: 'Bạn có chắc muốn xóa khách hàng này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Xác nhận',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      const path = `/admin/clients/delete/${id}?_method=DELETE`;
      const formDeleteRole = document.querySelector('[form-delete-client]');
      formDeleteRole.action = path;
      formDeleteRole.submit();
    }
  });
}

// Xem thông tin 1 khách hàng
const buttonInfoClient = document.querySelectorAll('[btn-info-client]');
if(buttonInfoClient) {
  buttonInfoClient.forEach(button => {
    button.addEventListener('click', (e) => {
      const tokenUser = button.getAttribute('tokenUser');
      const userId = button.getAttribute('user_id');
      
      const d = new Date();
      d.setTime(d.getTime() + (1000 * 60 * 10));
      const expires = "expires=" + d.toUTCString();

      document.cookie = `tokenUser=${tokenUser}; ${expires}; path=/`;

      window.location.href = `/users/profile/${userId}`;
    })
  })
}