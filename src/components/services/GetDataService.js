export default function getDataService(url) {
  const baseURL = `http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/${url}`;

  return fetch(baseURL)
    .then((res) => res.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
