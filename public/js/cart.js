let url = new URL(window.location.href);

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

// Xóa sản phẩm trong giỏ hàng
const buttonDeleteProductInCart = document.querySelectorAll('[btn-delete-product-in-cart]');
if(buttonDeleteProductInCart) {
  buttonDeleteProductInCart.forEach(button => {
    button.addEventListener('click', (e) => {
      const product_id = button.getAttribute('product_id');
      const size = button.getAttribute('size');

      const formDeleteProductInCart = document.querySelector('[form-delete-product-in-cart]');
      const inputProductId = document.querySelector('[input-product_id]');
      const inputSize = document.querySelector('[input-size]');

      inputProductId.value = product_id;
      inputSize.value = size;
      formDeleteProductInCart.submit();
    })
  })
}

// Tăng số lượng sản phẩm cần mua
const buttonPlus = document.querySelectorAll('.btn-plus');
if(buttonPlus) {
  buttonPlus.forEach(button => {
    const id_and_size = button.getAttribute('id_and_size');
    const [id, size] = id_and_size.split('-');
    button.addEventListener('click', (e) => {
      const inputQuantityProduct = document.querySelector(`.quantity-product-${id_and_size}`);
      const max = parseInt(inputQuantityProduct.getAttribute('max'));
      const value = parseInt(inputQuantityProduct.value);
      if(value < max) {
        inputQuantityProduct.value = value+1;
        inputQuantityProduct.dispatchEvent(new Event('change'));
        const totalPrice = document.querySelector(`.total-price-${id_and_size}`);
        totalPrice.innerHTML = (inputQuantityProduct.value*inputQuantityProduct.getAttribute('price')).toLocaleString();

        url.searchParams.set('_method', 'PATCH');
        url.searchParams.set('product_id', id);
        url.searchParams.set('size', size);
        url.searchParams.set('quantity', inputQuantityProduct.value);
        url.pathname = '/carts/edit/quantity';

        const formEditProductInCart = document.querySelector('[form-edit-product-in-cart]');
        formEditProductInCart.action = url;
        formEditProductInCart.submit();
      } else {
        showAlert('danger', `Cửa hàng chỉ còn ${inputQuantityProduct.value} sản phẩm này`);
      }
    })
  })
}

//Giảm số lượng sản phẩm cần mua
const buttonSub = document.querySelectorAll('.btn-sub');
if(buttonSub) {
  buttonSub.forEach(button => {
    const id_and_size = button.getAttribute('id_and_size');
    const [id, size] = id_and_size.split('-');
    button.addEventListener('click', (e) => {
      const inputQuantityProduct = document.querySelector(`.quantity-product-${id_and_size}`);
      const value = parseInt(inputQuantityProduct.value);
      if(value > 1) {
        inputQuantityProduct.value = value-1;
        inputQuantityProduct.dispatchEvent(new Event('change'));
        const totalPrice = document.querySelector(`.total-price-${id_and_size}`);
        totalPrice.innerHTML = (inputQuantityProduct.value*inputQuantityProduct.getAttribute('price')).toLocaleString();

        url.searchParams.set('_method', 'PATCH');
        url.searchParams.set('product_id', id);
        url.searchParams.set('size', size);
        url.searchParams.set('quantity', inputQuantityProduct.value);
        url.pathname = '/carts/edit/quantity';

        const formEditProductInCart = document.querySelector('[form-edit-product-in-cart]');
        formEditProductInCart.action = url;
        formEditProductInCart.submit();
      } else {
        showAlert('danger', `Số lượng sản phẩm phải lớn hơn 0`);
      }
    })
  })
}

// Thay đổi size của sản phẩm trong giỏ hàng
const changeSizeProduct = document.querySelectorAll('[change-size-product]');
if(changeSizeProduct) {
  changeSizeProduct.forEach(select => {
    const product_id = select.getAttribute('product_id');
    const oldSize = select.value;
    const inputQuantityProduct = document.querySelector(`.quantity-product-${product_id}-${select.value}`);
    select.addEventListener('change', (e) => {
      url.searchParams.set('_method', 'PATCH');
      url.searchParams.set('product_id', product_id);
      url.searchParams.set('size', e.target.value);
      url.searchParams.set('oldSize', oldSize);
      url.searchParams.set('quantity', inputQuantityProduct.value);
      url.pathname = '/carts/edit/size';

      const formEditProductInCart = document.querySelector('[form-edit-product-in-cart]');
      formEditProductInCart.action = url;
      formEditProductInCart.submit();
    })
  })
}

// Tích chọn sản phẩm để thanh toán
const checkoutProduct = document.querySelectorAll('[checkout-product]');
if(checkoutProduct) {
  checkoutProduct.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const checked = e.target.checked;
      const product_id = checkbox.getAttribute('product_id');
      const size = checkbox.getAttribute('size');
      url.searchParams.set('_method', 'PATCH');
      url.searchParams.set('product_id', product_id);
      url.searchParams.set('size', size);
      url.pathname = '/carts/edit/checkout';
      if(checked) {
        url.searchParams.set('checkout', true);
      } else {
        url.searchParams.set('checkout', false);
      }

      const formEditProductInCart = document.querySelector('[form-edit-product-in-cart]');
      formEditProductInCart.action = url;
      formEditProductInCart.submit();
    })
  })
}

// Tích chọn tất cả sản phẩm để thanh toán
const checkoutAllProduct = document.querySelector('[checkout-all-product]');
if(checkoutAllProduct) {

  const checkoutProduct = document.querySelectorAll('[checkout-product]');
  const allChecked = Array.from(checkoutProduct).every(checkbox => checkbox.checked);

  checkoutAllProduct.checked = allChecked;

  checkoutAllProduct.addEventListener('change', (e) => {
    const checked = e.target.checked;
    url.searchParams.set('_method', 'PATCH');
    url.pathname = '/carts/edit/checkout/all';
    if(checked) {
      url.searchParams.set('checkout', true);
    } else {
      url.searchParams.set('checkout', false);
    }
    const formEditProductInCart = document.querySelector('[form-edit-product-in-cart]');
    formEditProductInCart.action = url;
    formEditProductInCart.submit();
  })
}
