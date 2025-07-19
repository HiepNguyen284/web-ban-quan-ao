// Modal sửa chức vụ nhân viên
function changeRole(id, name, role_old) {
  const selectChangeRole = document.querySelector(`[select-change-role][data-id='${id}']`);

  Swal.fire({
    title: `Bạn có chắc muốn thay đổi chức vụ của ${name}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Xác nhận',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      const path = `/admin/staffs/change-role/${id}/${selectChangeRole.value}?_method=PATCH`;
      const formChangeRole = document.querySelector('[form-change-role]');
      formChangeRole.action = path;
      formChangeRole.submit();
    } else {
      selectChangeRole.value = role_old;
    }
  });
}


// Modal xác nhận xóa 
function confirmDelete(id) {
  Swal.fire({
    title: 'Bạn có chắc muốn xóa nhân viên này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Xác nhận',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      const path = `/admin/staffs/delete/${id}?_method=DELETE`;
      const formDeleteStaff = document.querySelector('[form-delete-staff]');
      formDeleteStaff.action = path;
      formDeleteStaff.submit();
    }
  });
}

// Modal duyệt nhân viên
function approveAccount(id) {
  Swal.fire({
    title: 'Bạn có chắc muốn chấp nhận tài khoản này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Xác nhận',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      const path = `/admin/staffs/change-status/${id}?_method=PATCH`;
      const formChangeStatus = document.querySelector('[form-change-status]');
      formChangeStatus.action = path;
      formChangeStatus.submit();
    }
  });
}

function rejectAccount(id) {
  Swal.fire({
    title: 'Bạn có chắc muốn chấp nhận tài khoản này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Xác nhận',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      const path = `/admin/staffs/delete/${id}?_method=DELETE`;
      const formDeleteStaff = document.querySelector('[form-delete-staff]');
      formDeleteStaff.action = path;
      formDeleteStaff.submit();
    }
  });
}