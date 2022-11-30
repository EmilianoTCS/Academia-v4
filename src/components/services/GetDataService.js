export default function getDataService(url) {
  const baseURL = `https://coebackendacademia.herokuapp.com/${url}`;

  return fetch(baseURL)
    .then((res) => res.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
