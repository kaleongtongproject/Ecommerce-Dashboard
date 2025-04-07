import { renderSummaryCards } from './components/summaryCards.js';
import { renderCharts } from './components/charts.js';
import { renderOrdersTable } from './components/table.js';
import { setupFilters } from './components/filters.js';
import { initThemeToggle } from './utils/themeToggle.js';

// Bootstraps the dashboard once the DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Load mock data
    const response = await fetch('./data/salesData.json');
    const data = await response.json();

    // Initialize UI
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
    console.error('Failed to initialize dashboard:', error);
    const main = document.querySelector('.main');
    if (main) {
      main.innerHTML = `<p style="color: red;">Error loading dashboard data. Please try again later.</p>`;
    }
  }
});
