// Modal xác nhận xóa 
function confirmDelete(id) {
  Swal.fire({
    title: 'Bạn có chắc muốn xóa liên hệ này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Xác nhận',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      const path = `/admin/contacts/delete/${id}?_method=DELETE`;
      const formDeleteContact = document.querySelector('[form-delete-contact]');
      formDeleteContact.action = path;
      formDeleteContact.submit();
    }
  });
}

function confirmEditStatus(id) {
  Swal.fire({
    title: 'Bạn có chắc muốn cập nhật trạng thái liên hệ này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Xác nhận',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      const path = `/admin/contacts/edit-status/${id}?_method=PATCH`;
      const formEditStatusContact = document.querySelector('[form-edit-status-contact]');
      formEditStatusContact.action = path;
      formEditStatusContact.submit();
    }
  });
}