export async function fetchSalesData() {
  try {
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
