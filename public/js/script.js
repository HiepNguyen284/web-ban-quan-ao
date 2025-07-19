// Hiển thị ảnh
const inputThumbnail = document.querySelector('#thumbnail');
if(inputThumbnail) {
  inputThumbnail.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const imgThumbnail = document.querySelector('#imgThumbnail');
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        if (imgThumbnail) {
          imgThumbnail.src = e.target.result;
          imgThumbnail.classList.remove('d-none');
        }
      };
      reader.readAsDataURL(file);
    } else {
      imgThumbnail.classList.add('d-none')
    }
  })
}

// Xử lý thông báo (Hiện 2 giây)
const alertCustom = document.querySelector('.alert-custom');
if (alertCustom) {
  setTimeout(() => {
    alertCustom.style.display = 'none';
  }, 1000);
}

// Xử lý phân trang
const paginationButton = document.querySelectorAll('[button-pagination]');
if (paginationButton) {
  paginationButton.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute('button-pagination');
      url.searchParams.set('page', page);
      window.location.href = url;
    });
  });
}

// Xử lý hiển thị số bản ghi
const limitRecords = document.querySelector('[limit-records]');
if(limitRecords) {
  limitRecords.addEventListener('change', (e) => {
    url.searchParams.set('limit', e.target.value);
    window.location.href = url;
  })
}

// Gắn giá trị cho ô tìm kiếm
const inputSearch = document.querySelector('[input-search]');
if(inputSearch) {
  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get("keyword");
  inputSearch.value = keyword;
}