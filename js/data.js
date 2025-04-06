export async function fetchSalesData() {
  try {
    const response = await fetch('data/salesData.json');
    if (!response.ok) throw new Error('Failed to fetch sales data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
}
