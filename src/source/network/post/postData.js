async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: data,
  });
  return response.json();
}

export default postData;
