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
        timer: 1000,
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(function () {
        location.reload();
      });
    case "errorRegisterRepeated":
      return MySwal.fire({
        title: "Se ha producido un error.",
        text: "Ya existe un registro con esos datos.",
        icon: "error",
        position: "top-right",
        timer: 2500,
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    case "SuccessfulDelivery":
      return MySwal.fire({
        title: "¡Bien!",
        text: "Hemos enviado un correo a la dirección escrita, revísalo para poder continuar con la operación. Puedes cerrar esta pestaña.",
        icon: "success",
        showConfirmButton: true,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ok!',
      });
    case "SuccessfulAnswered":
      return MySwal.fire({
        title: "¡Bien!",
        html: `
        <p>Se han registrado tus respuestas. </p>
        <p>¡Muchas gracias por colaborar!</p>
        `,
        icon: "success",
        showConfirmButton: true,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ok!',
      });
    case "successEditedPassword":
      return MySwal.fire({
        title: "¡Bien!",
        html: `
        <p>Se ha actualizado la clave de tu cuenta, puedes ingresar al enlace para acceder. </p>
        <a href="https://academiaformacion.netlify.app/login">Iniciar sesión</a>
        `,

        icon: "success",
        showConfirmButton: true,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ok!',
      }).then(function () {
        window.location.href = "https://academiaformacion.netlify.app/login";
      });
    case "changesSaved":
      return MySwal.fire({
        title: "Se han guardado los cambios",
        icon: "success",
        position: "top-right",
        timer: 1000,
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    case "successDeleted":
      return MySwal.fire({
        title: "Se ha eliminado el registro",
        icon: "success",
        position: "top-right",
        timer: 1000,
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(function () {
        location.reload();
      });
    case "successEdited":
      return MySwal.fire({
        title: "Se ha actualizado el registro",
        icon: "success",
        position: "top-right",
        timer: 1000,
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(function () {
        location.reload();
      });

    case "successEnabled":
      return MySwal.fire({
        title: "Se ha actualizado el registro",
        icon: "success",
        position: "top-right",
        timer: 1000,
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
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
        timerProgressBar: true,
      });
    case "errorRequisitos":
      return MySwal.fire({
        title: "¡Ups!",
        html: `
        <p>No cumples con los requisitos para inscribirte en este curso </p>
        <p>O el curso seleccionado ya finalizó. </p>
        `,
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ok!',
      });
    case "errorInscripcionExistente":
      return MySwal.fire({
        title: "¡Ups!",
        html: `
          <p>Ya estás inscrito en este curso.</p>
          `,
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ok!',
      });
    case "errorCursoNoExiste":
      return MySwal.fire({
        title: "¡Ups!",
        html: `
        <p>Actualmente no existen inscripciones disponibles para este curso.</p>
        `,
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ok!',
      });
    case "errorPrerrequisito":
      return MySwal.fire({
        title: "Error!",
        html: `
        <p>No puedes añadir un prerrequisito que ya existe. </p>
        `,
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ok!',
      });
    case "repeatedPassword":
      return MySwal.fire({
        title: "Se ha producido un error.",
        text: "No puedes utilizar la contraseña actual.",
        icon: "error",
        showConfirmButton: false,
        timerProgressBar: true,
      });
    case "errorFechas":
      return MySwal.fire({
        title: "Se ha producido un error.",
        text: "Introduce una fecha válida superior a la de hoy.",
        icon: "error",
        timer: 1200,
        showConfirmButton: false,
        timerProgressBar: true,
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
