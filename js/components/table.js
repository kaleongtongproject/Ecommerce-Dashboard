// table.js

export function renderOrdersTable(orders) {
  const tableBody = document.getElementById('ordersTable');
  if (!tableBody) return;

  // Clear existing content
  tableBody.innerHTML = '';

  orders.forEach((order) => {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${order.orderId}</td>
        <td>${order.customer}</td>
        <td>${formatDate(order.date)}</td>
        <td>$${order.total.toFixed(2)}</td>
        <td><span class="status ${getStatusClass(order.status)}">${
      order.status
    }</span></td>
      `;

    tableBody.appendChild(row);
  });
}

// Optional utility for formatting the date
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Optional utility for coloring statuses
function getStatusClass(status) {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'status-paid';
    case 'shipped':
      return 'status-shipped';
    case 'pending':
      return 'status-pending';
    case 'cancelled':
      return 'status-cancelled';
    default:
      return '';
  }
}
