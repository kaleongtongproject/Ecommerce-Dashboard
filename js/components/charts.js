// charts.js

let salesChartInstance = null;
let categoryChartInstance = null;

export function renderCharts(data) {
  const selectedCategory = getSelectedCategory();
  renderSalesBarChart(data.dailySales, selectedCategory);
  renderCategoryPieChart(data.categorySales, selectedCategory);
}

function getSelectedCategory() {
  const select = document.getElementById('categoryFilter');
  return select?.value || 'all';
}

function renderSalesBarChart(dailySales, selectedCategory) {
  const ctx = document.getElementById('salesChart').getContext('2d');

  if (salesChartInstance) {
    salesChartInstance.destroy();
  }

  const labels = dailySales.map((entry) => entry.date);
  const values = dailySales.map((entry) => {
    if (selectedCategory === 'all') {
      return Object.values(entry.categories).reduce((sum, val) => sum + val, 0);
    }
    return entry.categories[selectedCategory] || 0;
  });

  salesChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label:
            selectedCategory === 'all'
              ? 'Total Sales ($)'
              : `${selectedCategory} Sales ($)`,
          data: values,
          backgroundColor: '#3b82f6',
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `$${ctx.parsed.y.toLocaleString('en-US')}`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => `$${value}`,
          },
        },
      },
    },
  });
}

function renderCategoryPieChart(categorySales, selectedCategory) {
  const ctx = document.getElementById('categoryChart').getContext('2d');

  if (categoryChartInstance) {
    categoryChartInstance.destroy();
  }

  let labels = [];
  let values = [];
  let chartLabel = 'Sales by Category';

  if (selectedCategory === 'all') {
    labels = categorySales.map((cat) => cat.category);
    values = categorySales.map((cat) => cat.total);
  } else {
    const category = categorySales.find(
      (cat) => cat.category === selectedCategory
    );
    if (category && category.subcategories) {
      labels = category.subcategories.map((sub) => sub.name);
      values = category.subcategories.map((sub) => sub.total);
      chartLabel = `${selectedCategory} - Subcategory Sales`;
    }
  }

  categoryChartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [
        {
          label: chartLabel,
          data: values,
          backgroundColor: [
            '#f97316',
            '#10b981',
            '#6366f1',
            '#ec4899',
            '#facc15',
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        tooltip: {
          callbacks: {
            label: (ctx) =>
              `${ctx.label}: $${ctx.parsed.toLocaleString('en-US')}`,
          },
        },
      },
    },
  });
}
