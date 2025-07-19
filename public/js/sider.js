let url = new URL(window.location.href);

document.addEventListener('DOMContentLoaded', function () {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('.menu li a');

  links.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".has-children");
  const timeoutMap = new Map();

  menuItems.forEach(item => {
    const submenu = item.querySelector(".sub-menu");

    item.addEventListener("mouseenter", () => {
      clearTimeout(timeoutMap.get(item));
      submenu.style.display = "block";
    });

    item.addEventListener("mouseleave", () => {
      const timeoutId = setTimeout(() => {
        submenu.style.display = "none";
      }, 2000); // 10000ms = 10 giây
      timeoutMap.set(item, timeoutId);
    });
  });
});

// Xử lý lọc sản phẩm theo danh mục
const categoryNames = document.querySelectorAll('.category-name');
if(categoryNames) {
  categoryNames.forEach(categoryName => {
    categoryName.addEventListener('click', (e) => {
      const slug = categoryName.getAttribute('slug');
      url.searchParams.set('category', slug);
      window.location.href = url;
    })
  })
}

// Xử lý lọc theo giá
const filterPrice = document.querySelector('[filter-price]');
if(filterPrice) {
  const url = new URL(window.location.href);
  const selectedPrice = url.searchParams.get('price');
  if (selectedPrice) {
    filterPrice.value = selectedPrice; // set lại lựa chọn
  }

  filterPrice.addEventListener('change', (e) => {
    url.searchParams.set('price', e.target.value);
    window.location.href = url;
  })
}

// Sắp xếp sản phẩm
const sortProduct = document.querySelector('[sort-product]');
if(sortProduct) {
  const url = new URL(window.location.href);
  const selectedSort = url.searchParams.get('sort');
  if (selectedSort) {
    sortProduct.value = selectedSort; // set lại lựa chọn
  }

  sortProduct.addEventListener('change', (e) => {
    url.searchParams.set('sort', e.target.value);
    window.location.href = url;
  })
}