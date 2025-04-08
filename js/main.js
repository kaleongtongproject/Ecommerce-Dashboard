import { renderSummaryCards } from './components/summaryCards.js';
import { renderCharts } from './components/charts.js';
import { renderOrdersTable } from './components/table.js';
import { setupFilters } from './components/filters.js';
import { initThemeToggle } from './utils/themeToggle.js';
import { renderOrders } from './components/orders.js';

// 📦 Dashboard setup
async function renderDashboard() {
  try {
    const response = await fetch(
      `https://kaleongtongproject.github.io/Ecommerce-Dashboard/data/salesData.json`
    );
    const data = await response.json();

    const main = document.querySelector('.main');

    // Set up HTML layout for dashboard
    main.innerHTML = `
      <header class="header">
        <h1>Dashboard</h1>
        <button id="themeToggle">🌙</button>
      </header>

      <section class="filters">
        <label for="categoryFilter">
          Category:
          <select id="categoryFilter"></select>
        </label>
        <label for="dateFilter">
          Date Range:
          <select id="dateFilter">
            <option value="all">All Time</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </label>
      </section>

      <section class="summary-panels">
        <div class="panel" id="totalSales"></div>
        <div class="panel" id="avgOrderValue"></div>
        <div class="panel" id="totalOrders"></div>
        <div class="panel" id="topCategory"></div>
      </section>

      <section class="charts">
        <div class="chart-card">
          <h2>Daily Sales</h2>
          <canvas id="salesChart"></canvas>
        </div>
        <div class="chart-card">
          <h2>Sales by Category</h2>
          <canvas id="categoryChart"></canvas>
        </div>
      </section>

      <section class="orders">
        <h2>Recent Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="ordersTable"></tbody>
        </table>
      </section>
    `;

    renderSummaryCards(data);
    renderCharts(data);
    renderOrdersTable(data.orders);
    setupFilters(data, (filteredData) => {
      renderSummaryCards(filteredData);
      renderCharts(filteredData);
      renderOrdersTable(filteredData.orders);
    });
    initThemeToggle();
  } catch (error) {
    console.error('Failed to load dashboard:', error);
    document.querySelector('.main').innerHTML =
      '<p style="color: red;">Error loading dashboard data.</p>';
  }
}

// 🚀 Boot app on page load
document.addEventListener('DOMContentLoaded', () => {
  renderDashboard();
});

// 📍 Sidebar navigation
document.querySelector('.sidebar').addEventListener('click', async (e) => {
  e.preventDefault();

  const clicked = e.target.closest('.nav-link');
  if (!clicked) return;

  // Update active style
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.remove('active');
  });
  clicked.classList.add('active');

  const page = clicked.textContent.trim();
  const main = document.querySelector('.main');
  main.innerHTML = '';

  if (page === 'Dashboard') {
    renderDashboard();
  }

  if (page === 'Orders') {
    renderOrders(); // Renders orders page from JSON
  }

  // Future: add Products, Customers support here
});
