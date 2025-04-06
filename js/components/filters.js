// filters.js

let rawData = null;
let onFilterChangeCallback = null;

/**
 * Sets up category and date filters
 * @param {Object} data - Raw data from salesData.json
 * @param {Function} onFilterChange - Callback to pass filtered results to main.js
 */
export function setupFilters(data, onFilterChange) {
  rawData = data;
  onFilterChangeCallback = onFilterChange;

  const categorySelect = document.getElementById('categoryFilter');
  const dateSelect = document.getElementById('dateFilter');

  // Dynamically populate categories from order data
  const categories = [...new Set(data.orders.map((order) => order.category))];
  categorySelect.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  // Add event listeners
  categorySelect.addEventListener('change', applyFilters);
  dateSelect.addEventListener('change', applyFilters);
}

/**
 * Applies the selected filters and calls the update callback
 */
function applyFilters() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const selectedDateRange = document.getElementById('dateFilter').value;

  const filteredOrders = filterOrders(
    rawData.orders,
    selectedCategory,
    selectedDateRange
  );
  const filteredCategorySales = filterCategorySales(
    rawData.categorySales,
    selectedCategory
  );
  const filteredDailySales = filterSalesByDate(
    rawData.dailySales,
    selectedDateRange
  ); // Only filtered by date

  onFilterChangeCallback({
    orders: filteredOrders,
    categorySales: filteredCategorySales,
    dailySales: filteredDailySales,
  });
}

// Filter helpers

function filterOrders(orders, selectedCategory, dateRange) {
  let result = [...orders];

  if (selectedCategory !== 'all') {
    result = result.filter((order) => order.category === selectedCategory);
  }

  if (dateRange !== 'all') {
    const cutoff = getDateCutoff(dateRange);
    result = result.filter((order) => new Date(order.date) >= cutoff);
  }

  return result;
}

function filterCategorySales(categorySales, selectedCategory) {
  if (selectedCategory === 'all') return categorySales;
  return categorySales.filter((cat) => cat.category === selectedCategory);
}

function filterSalesByDate(sales, dateRange) {
  if (dateRange === 'all') return sales;
  const cutoff = getDateCutoff(dateRange);
  return sales.filter((entry) => new Date(entry.date) >= cutoff);
}

function getDateCutoff(range) {
  const today = new Date();
  const cutoff = new Date(today);

  switch (range) {
    case '7d':
      cutoff.setDate(today.getDate() - 7);
      break;
    case '30d':
      cutoff.setDate(today.getDate() - 30);
      break;
  }
  return cutoff;
}
