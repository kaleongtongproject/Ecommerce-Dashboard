// components/products.js

let productData = [];
let currentIndex = 0;
const ITEMS_PER_LOAD = 8;

export async function renderProducts() {
  const main = document.querySelector('.main');
  const res = await fetch('./data/productsData.json');
  productData = await res.json();
  currentIndex = 0;

  main.innerHTML = `
    <header class="header">
      <h1>Products</h1>
    </header>

    <section class="products-controls">
      <input type="text" id="productSearch" placeholder="Search products..." />
    </section>

    <section class="products-grid" id="productsGrid"></section>
    <div id="loadingIndicator" style="text-align:center; padding:1rem; color: var(--text); display: none;">Loading...</div>
  `;

  const grid = document.getElementById('productsGrid');
  const loading = document.getElementById('loadingIndicator');
  const searchInput = document.getElementById('productSearch');
  const scrollTarget = document.querySelector('.main');

  // Initial load
  renderNextProducts();

  // Infinite scroll on container
  scrollTarget.addEventListener('scroll', () => {
    const nearBottom =
      scrollTarget.scrollTop + scrollTarget.clientHeight >=
      scrollTarget.scrollHeight - 100;

    if (nearBottom && currentIndex < productData.length) {
      loading.style.display = 'block';
      setTimeout(() => {
        renderNextProducts();
        loading.style.display = 'none';
      }, 300);
    }
  });

  // Filter on search input
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = productData.filter((p) =>
      p.name.toLowerCase().includes(query)
    );

    currentIndex = 0;
    grid.innerHTML = '';
    renderNextProducts(filtered);
  });
}

function renderNextProducts(dataSet = productData) {
  const grid = document.getElementById('productsGrid');
  const nextItems = dataSet.slice(currentIndex, currentIndex + ITEMS_PER_LOAD);

  nextItems.forEach((product) => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <p>Stock: ${product.stock}</p>
        <span class="badge ${product.status.toLowerCase()}">${
      product.status
    }</span>
      </div>
    `;
    grid.appendChild(card);
  });

  currentIndex += ITEMS_PER_LOAD;
}
