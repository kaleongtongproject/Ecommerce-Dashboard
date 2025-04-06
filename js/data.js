export async function fetchSalesData() {
  try {
    const basePath = window.location.pathname.includes('/Ecommerce-Dashboard')
      ? 'https://kaleongtongproject.github.io/Ecommerce-Dashboard'
      : '';

    console.log('base Path: ', basePath);
    console.log('window pathname: ', window.location.pathname);
    const response = await fetch(
      `https://kaleongtongproject.github.io/Ecommerce-Dashboard/data/salesData.json`
    );

    if (!response.ok) throw new Error('Failed to fetch sales data');
    return await response.json();
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
}
