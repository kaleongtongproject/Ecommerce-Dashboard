// components/orders.js
export async function renderOrders() {
  const main = document.querySelector('.main');

  const res = await fetch('./data/ordersData.json'); // Update path if needed
  const orders = await res.json();

  main.innerHTML = `
      <header class="header">
        <h1>Orders</h1>
      </header>
  
      <section class="orders-controls">
        <input type="text" id="orderSearch" placeholder="Search by customer or order #" />
        <select id="statusFilter">
          <option value="all">All Statuses</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </section>
  
      <section class="orders">
        <table class="orders-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="ordersBody">
            ${renderOrderRows(orders)}
          </tbody>
        </table>
      </section>
    `;

  // Filtering logic
  const searchInput = document.getElementById('orderSearch');
  const statusFilter = document.getElementById('statusFilter');
  const ordersBody = document.getElementById('ordersBody');

  const filterOrders = () => {
    const query = searchInput.value.toLowerCase();
    const status = statusFilter.value;
    const filtered = orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query);
      const matchesStatus =
        status === 'all' || order.status.toLowerCase() === status.toLowerCase();
      return matchesSearch && matchesStatus;
    });
    ordersBody.innerHTML = renderOrderRows(filtered);
  };

  searchInput.addEventListener('input', filterOrders);
  statusFilter.addEventListener('change', filterOrders);
}

function renderOrderRows(orderList) {
  if (orderList.length === 0) {
    return `<tr><td colspan="6" style="text-align: center;">No orders found.</td></tr>`;
  }

  return orderList
    .map(
      (order) => `
      <tr>
        <td>${order.id}</td>
        <td>${order.customer}</td>
        <td>${order.date}</td>
        <td>$${order.total.toFixed(2)}</td>
        <td><span class="badge ${order.status.toLowerCase()}">${
        order.status
      }</span></td>
        <td><button class="view-btn">View</button></td>
      </tr>
    `
    )
    .join('');
}
