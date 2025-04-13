// components/customers.js

export async function renderCustomers() {
  const main = document.querySelector('.main');
  const res = await fetch('./data/customersData.json');
  const customers = await res.json();

  main.innerHTML = `
      <header class="header">
        <h1>Customers</h1>
        <button class="add-btn" id="openCustomerPanel">+ Add Customer</button>
      </header>
  
      <section class="customer-metrics">
        <div class="metric"><h3>Total Customers</h3><p>${
          customers.length
        }</p></div>
        <div class="metric"><h3>New Customers</h3><p>${countNewCustomers(
          customers
        )}</p></div>
        <div class="metric"><h3>Churn Rate</h3><p>${calcChurnRate(
          customers
        )}%</p></div>
      </section>
  
      <section class="customer-filters">
        <select id="statusFilter">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="churned">Churned</option>
          <option value="premium">Premium</option>
        </select>
        <input type="text" id="searchCustomer" placeholder="Search customers..." />
      </section>
  
      <section class="customers-table">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Location</th><th>Orders</th><th>Spent</th><th>Status</th>
            </tr>
          </thead>
          <tbody id="customerTableBody">
            ${renderCustomerRows(customers)}
          </tbody>
        </table>
      </section>
  
      <!-- Add Customer Side Panel -->
      <div class="customer-panel" id="customerPanel">
        <div class="panel-header">
          <h2>Add Customer</h2>
          <button id="closeCustomerPanel">&times;</button>
        </div>
        <form id="customerForm">
          <input type="text" name="name" placeholder="Full Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="text" name="location" placeholder="Location" required />
          <input type="number" name="orders" placeholder="Orders" />
          <input type="number" name="spent" placeholder="Amount Spent" />
          <select name="status" required>
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Churned">Churned</option>
            <option value="Premium">Premium</option>
          </select>
          <label><input type="checkbox" name="new" /> New Customer?</label>
          <button type="submit" class="submit-btn">Add</button>
        </form>
      </div>
    `;

  const body = document.getElementById('customerTableBody');
  const search = document.getElementById('searchCustomer');
  const status = document.getElementById('statusFilter');

  const filterAndRender = () => {
    const query = search.value.toLowerCase();
    const selected = status.value;
    const filtered = customers.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query);
      const matchesStatus =
        selected === 'all' || c.status.toLowerCase() === selected;
      return matchesSearch && matchesStatus;
    });
    body.innerHTML = renderCustomerRows(filtered);
  };

  search.addEventListener('input', filterAndRender);
  status.addEventListener('change', filterAndRender);

  // Panel controls
  const panel = document.getElementById('customerPanel');
  document.getElementById('openCustomerPanel').onclick = () =>
    panel.classList.add('open');
  document.getElementById('closeCustomerPanel').onclick = () =>
    panel.classList.remove('open');

  document.getElementById('customerForm').onsubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newCustomer = {
      id: Math.floor(Math.random() * 10000),
      name: form.name.value,
      email: form.email.value,
      location: form.location.value,
      orders: Number(form.orders.value || 0),
      spent: Number(form.spent.value || 0),
      status: form.status.value,
      new: form.new.checked,
    };
    customers.unshift(newCustomer);
    filterAndRender();
    panel.classList.remove('open');
    form.reset();
  };
}

function renderCustomerRows(customers) {
  return customers
    .map(
      (c) => `
      <tr>
        <td>#${c.id}</td>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>${c.location}</td>
        <td>${c.orders}</td>
        <td>$${c.spent.toFixed(2)}</td>
        <td><span class="badge ${c.status.toLowerCase()}">${
        c.status
      }</span></td>
      </tr>
    `
    )
    .join('');
}

function countNewCustomers(customers) {
  return customers.filter((c) => c.new).length;
}

function calcChurnRate(customers) {
  const churned = customers.filter((c) => c.status.toLowerCase() === 'churned')
    .length;
  return ((churned / customers.length) * 100).toFixed(1);
}
