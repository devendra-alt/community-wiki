const fetchGeoData = async (url, options = {}) => {
  try {
    const response = await fetch(
      `http://164.52.200.133:8090/api/configuration-management/get-address?pincode=${url}`,
      options
    );

    if (!response.ok) {
      // Handle non-successful responses here
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any errors during the fetch
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default fetchGeoData;
