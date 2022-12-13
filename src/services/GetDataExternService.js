export default function getDataExternService(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((response) => {
      const data = response;
      return data;
    })
    .catch((error) => console.log(error));
}
