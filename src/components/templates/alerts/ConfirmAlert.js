import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function ConfirmAlert(props) {
  const MySwal = withReactContent(Swal);
  const promise1 = new Promise((resolve, reject) => {
    MySwal.fire({
      title: "¿Deseas eliminar este registro?",
      text: "Puedes volver a habilitarlo en la página Administrador",
      icon: "warning",
      iconColor: "#e10b1c",
      showConfirmButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
      showCancelButton: true,
      cancelButtonColor: "dark-gray",
      cancelButtonText: "Cancelar",
    }).then((response) => {
      if (response.isConfirmed) {
        resolve(true);
      }
    });
  });
  return promise1;
}
