export default function LoginService({ username, password }) {
  const baseURL =
    "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/login.php?login";

  return fetch(baseURL, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (!response) throw new Error("Fallo en la conexion");
      return response.json();
    })
    .then((response) => {
      const data = response;
      return data;
    });
}
