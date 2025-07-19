const urlSearch = new URL(window.location.href);
const buttonSearchProducts = document.querySelector('[btn-search-products]');
if(buttonSearchProducts) {
  buttonSearchProducts.addEventListener('click', (e) => {
    const inputSearchProducts = document.querySelector('[input-search-products]');
    const keyword = inputSearchProducts.value;
    urlSearch.searchParams.set('keyword', keyword);
    urlSearch.pathname = '/products';
    window.location.href = urlSearch;
  })
}
