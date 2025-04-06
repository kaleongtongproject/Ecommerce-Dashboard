// summaryCards.js

export function renderSummaryCards(data) {
  const formatCurrency = (value) =>
    `$${value.toFixed(2).toLocaleString('en-US')}`;

  const selectedCategory =
    document.getElementById('categoryFilter')?.value || 'all';

  // 1. Total Sales
  const totalSales = data.dailySales.reduce((sum, day) => {
    if (selectedCategory === 'all') {
      const dayTotal = Object.values(day.categories).reduce(
        (s, val) => s + val,
        0
      );
      return sum + dayTotal;
    } else {
      return sum + (day.categories[selectedCategory] || 0);
    }
  }, 0);

  // 2. Average Order Value (based on filtered orders)
  const avgOrderValue =
    data.orders.length > 0
      ? data.orders.reduce((sum, o) => sum + o.total, 0) / data.orders.length
      : 0;

  // 3. Total Orders
  const totalOrders = data.orders.length;

  // 4. Top Category
  const topCategory =
    data.categorySales.length > 0
      ? data.categorySales.reduce((prev, curr) =>
          curr.total > prev.total ? curr : prev
        ).category
      : 'N/A';

  // Update UI
  document.getElementById('totalSales').innerHTML = `
      <p>Total Sales</p>
      <h2>${formatCurrency(totalSales)}</h2>
    `;

  document.getElementById('avgOrderValue').innerHTML = `
      <p>Avg Order Value</p>
      <h2>${formatCurrency(avgOrderValue)}</h2>
    `;

  document.getElementById('totalOrders').innerHTML = `
      <p>Total Orders</p>
      <h2>${totalOrders}</h2>
    `;

  document.getElementById('topCategory').innerHTML = `
      <p>Top Category</p>
      <h2>${topCategory}</h2>
    `;
}
