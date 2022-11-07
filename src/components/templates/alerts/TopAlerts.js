import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function TopAlerts(props) {
  const MySwal = withReactContent(Swal);

  switch (props) {
    case "successCreated":
      return MySwal.fire({
        title: "Se ha creado el registro",
        icon: "success",
        position: "top-right",
        timer: 2500,
        toast: true,
        showConfirmButton: false,
      });
    case "successDeleted":
      return MySwal.fire({
        title: "Se ha eliminado el registro",
        icon: "success",
        position: "top-right",
        timer: 2500,
        toast: true,
        showConfirmButton: false,
      });
    case "successEdited":
      return MySwal.fire({
        title: "Se ha actualizado el registro",
        icon: "success",
        position: "top-right",
        timer: 2500,
        toast: true,
        showConfirmButton: false,
      });
    case "errorRepeated":
      return MySwal.fire({
        title: "Se ha producido un error.",
        text: "Ya existe un evento registrado en esa fecha y hora.",
        icon: "error",
        position: "top-right",
        timer: 2500,
        toast: true,
        showConfirmButton: false,
      });
    case "Error":
      return MySwal.fire({
        title: "Se ha producido un error.",
        icon: "error",
        position: "top-right",
        timer: 2500,
        toast: true,
        showConfirmButton: false,
      });
    default:
      break;
  }
}
