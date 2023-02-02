export default function SendDataService(url, operationUrl, data) {
  const baseURL = `http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/${url}?${operationUrl}`;

  return fetch(baseURL, {
    method: "post",
    body: JSON.stringify(data),

  })
    .then((res) => res.json())
    .then((response) => {
      const data = response;

      return data;
    });
}
