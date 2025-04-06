export async function fetchSalesData() {
  try {
    const basePath = window.location.pathname.includes('/Ecommerce-Dashboard')
      ? '/Ecommerce-Dashboard'
      : '';

    const response = await fetch(`${basePath}/data/salesData.json`);

    if (!response.ok) throw new Error('Failed to fetch sales data');
    return await response.json();
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
}
