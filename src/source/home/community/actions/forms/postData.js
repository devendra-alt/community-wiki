// Example POST method implementation:
async function postData(url = '', data = {}) {
  console.log(data, url);
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: data,
  });
  return response.json();
}

export default postData;
