const urlProduct = new URL(window.location.href);

// Hiển thị thông báo
function showAlert(type, message) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert-custom alert alert-${type}`;
  alertDiv.setAttribute('data-alert-type', type);
  alertDiv.innerText = message;

  document.body.prepend(alertDiv);

  setTimeout(() => {
    alertDiv.remove();
  }, 1000);
}

// Khi tích vào size -> Ô nhập số lượng hiện ra
const productSizes = document.querySelectorAll('.size');
if(productSizes) {
  productSizes.forEach(input => {
    const size = input.value;
    const stock = document.querySelector(`#stock${size}`);

    window.addEventListener('load', () => {
      if(input.checked) {
        stock.classList.remove('d-none');
      } else {
        stock.classList.add('d-none');
      }
    });

    input.addEventListener('change', (e) => {
      console.log(input.checked);
      if(e.target.checked) {
        stock.classList.remove('d-none');
      } else {
        stock.classList.add('d-none');
      }
    })
  })
}

// Modal xác nhận xóa 
function confirmDelete(id) {
  Swal.fire({
    title: 'Bạn có chắc muốn xóa sản phẩm này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#aaa',
    confirmButtonText: 'Xác nhận',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.isConfirmed) {
      const path = `/admin/products/delete/${id}?_method=DELETE`;
      const formDeleteProduct = document.querySelector('[form-delete-product]');
      formDeleteProduct.action = path;
      formDeleteProduct.submit();
    }
  });
}

// Tăng số lượng sản phẩm cần mua
const buttonPlus = document.querySelector('.btn-plus');
if(buttonPlus) {
  buttonPlus.addEventListener('click', (e) => {
    const inputQuantityProduct = document.querySelector('.quantity-product');
    const max = parseInt(inputQuantityProduct.getAttribute('max'));
    const value = parseInt(inputQuantityProduct.value);
    if(value < max) {
      inputQuantityProduct.value = value+1;
    } else {
      showAlert('danger', `Cửa hàng chỉ còn ${inputQuantityProduct.value} sản phẩm này`);
    }
  })
}

//Giảm số lượng sản phẩm cần mua
const buttonSub = document.querySelector('.btn-sub');
if(buttonSub) {
  buttonSub.addEventListener('click', (e) => {
    const inputQuantityProduct = document.querySelector('.quantity-product');
    const value = parseInt(inputQuantityProduct.value);
    if(value > 1) {
      inputQuantityProduct.value = value-1;
    } else {
      showAlert('danger', `Số lượng sản phẩm phải lớn hơn 0`);
    }
  })
}

// Chọn size sản phẩm
const buttonChooseSize = document.querySelectorAll('.choose-size');
if(buttonChooseSize) {
  buttonChooseSize.forEach(button => {
    button.addEventListener('click', (e) => {
      const sizeIndex = e.target.value;
      urlProduct.searchParams.set('sizeIndex', sizeIndex);
      window.location.href = urlProduct;
    })
  })
}

// Xử lý ấn nút mua ngay
const buttonBuyProduct = document.querySelector('[btn-buy-product]') ;
if(buttonBuyProduct) {
  buttonBuyProduct.addEventListener('click', (e) => {
    const product_id = buttonBuyProduct.getAttribute('product_id');
    const product_size = buttonBuyProduct.getAttribute('product_size');
    const inputQuantity = document.querySelector('.quantity-product')
    const product_quantity = inputQuantity.value;

    urlProduct.pathname = `/buy-now/${product_id}/${product_size}/${product_quantity}`;
    window.location.href = urlProduct;
  })
}