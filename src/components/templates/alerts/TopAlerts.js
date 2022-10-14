import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function TopAlerts(props) {
  const MySwal = withReactContent(Swal);

  if (props === "success") {
    return MySwal.fire({
      title: "Se ha actualizado el registro",
      icon: "success",
      position: "top-right",
      timer: 2500,
      toast: true,
      showConfirmButton: false,
    });
  } else {
    return MySwal.fire({
      title: "Se ha producido un error",
      icon: "error",
      position: "top-right",
      timer: 2500,
      toast: true,
      showConfirmButton: false,
    });
  }
}
