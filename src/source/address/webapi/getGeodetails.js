const fetchGeoData = async (url, options = {}) => {
  try {
    const response = await fetch(
      `https://eksamaj.in/pincode/api/configuration-management/get-address?pincode=${url}`,
      options
    );

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default fetchGeoData;
