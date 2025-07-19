const urlOrder = new URL(window.location.href);

// Hiện và đóng chi tiết đơn hàng (admin)
const showDetailOrder = document.querySelectorAll('[show-detail-order]');
if(showDetailOrder) {
  showDetailOrder.forEach(button => {
    button.addEventListener('click', (e) => {
      const order_id = button.getAttribute('order_id');
      const detailOrder = document.querySelector(`#order-${order_id}`);
      detailOrder.classList.remove('d-none');
    })
  })
}

const closeDetailOrder = document.querySelectorAll('[close-detail-order]');
if(closeDetailOrder) {
  closeDetailOrder.forEach(button => {
    button.addEventListener('click', (e) => {
      const order_id = button.getAttribute('order_id');
      const detailOrder = document.querySelector(`#order-${order_id}`);
      detailOrder.classList.add('d-none');
    })
  })
}

// Thay đổi trạng thái đơn hàng
const changeStatusOrder = document.querySelectorAll('[change-status-order]');
if(changeStatusOrder) {
  changeStatusOrder.forEach(select => {
    select.addEventListener('change', (e) => {
      const order_id = select.getAttribute('order_id');
      const action = `/admin/orders/change-status/${order_id}/${e.target.value}?_method=PATCH`;

      const formChangeStatusOrder = document.querySelector('[form-change-status-order]');
      formChangeStatusOrder.action = action;
      formChangeStatusOrder.submit();
    })
  })
}

// Xác nhận đã nhận được hàng (client)
const buttonReceived = document.querySelectorAll('[btn-received]');
if(buttonReceived) {
  buttonReceived.forEach(button => {
    button.addEventListener('click', (e) => {
      const order_id = button.getAttribute('order_id');
      const action = `/orders/change-received/${order_id}?_method=PATCH`;

      const formReceived = document.querySelector('[form-received]');
      formReceived.action = action;
      formReceived.submit();
    })
  })
}

// Đặt lại form order
const resetFilterOrder = document.querySelector('[reset-filter-order]');
if(resetFilterOrder) {
  resetFilterOrder.addEventListener('click', (e) => {
    urlOrder.search = '';
    window.location.href = urlOrder;
  })
}

// Gán lại giá trị cho bộ lọc khi load lại trang
const filterOrderStatus = document.querySelector('[filter-order-status]');
if(filterOrderStatus) {
  const status = urlOrder.searchParams.get('status');
  if(status) {
    filterOrderStatus.value = status
  }
}

const filterOrderPayment = document.querySelector('[filter-order-payment]');
if(filterOrderPayment) {
  const status = urlOrder.searchParams.get('payment');
  if(status) {
    filterOrderPayment.value = status
  }
}

const fromDate = document.querySelector('#from_date');
if(fromDate) {
  const date = urlOrder.searchParams.get('from_date');
  if(date) {
    fromDate.value = date;
  }
}

const toDate = document.querySelector('#to_date');
if(toDate) {
  const date = urlOrder.searchParams.get('to_date');
  if(date) {
    toDate.value = date;
  }
}
