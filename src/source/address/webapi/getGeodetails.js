const fetchGeoData = async (url, options = {}) => {
  try {
    debugger;
    const response = await fetch(
      `http://164.52.200.133:8090/api/configuration-management/get-address?pincode=${url}`,
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
