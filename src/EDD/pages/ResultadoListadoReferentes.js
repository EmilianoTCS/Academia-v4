// import React, { useState, useEffect } from "react";
// import { Container, Table } from "react-bootstrap";
// import { Navigate, Link } from "react-router-dom";
// import getDataService from "../../services/GetDataService";
// import SendDataService from "../../services/SendDataService";
// import Header from "../templates/Header";
// import { BsFillTrashFill } from "react-icons/bs";
// import { RiEditBoxFill } from "react-icons/ri";
// import { HiEye } from "react-icons/hi";
// import "../css/TablasStyles.css";
// import "../css/InsertarCursoListadoCursosYRamos.css";
// import InsertarCurso from "../templates/forms/InsertarCurso";

// import EditarCurso from "../templates/forms/EditarCurso";
// import ConfirmAlert from "../templates/alerts/ConfirmAlert";
// import TopAlerts from "../templates/alerts/TopAlerts";
// import Button from "react-bootstrap/Button";
// import Paginador from "../templates/Paginador";

// export default function ResultadoListadoReferentes() {
//   const [cursos, setCursos] = useState([""]);
//   const [paginador, setPaginadorCursos] = useState([]);
//   const url = "TASKS/coe-listCuentas.php";
//   const urlPaginador = "paginador/botones_Cuenta.php";
//   const operationUrl = "pagina";
//   const [isActiveInsertCurso, setIsActiveInsertCurso] = useState(false);
//   const [isActiveEditCurso, setIsActiveEditCurso] = useState(false);
//   // const [IDCurso, setIDCurso] = useState(null);

//   const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

//   //PAGINADOR ---------------------

//   const [num_boton, setNumBoton] = useState(1);

//   function obtenerDatosPaginador() {
//     getDataService(urlPaginador).then((paginador) =>
//       setPaginadorCursos(paginador)
//     );
//   }
//   function handleChangePaginador() {
//     var data = {
//       num_boton: num_boton,
//     };
//     SendDataService(url, operationUrl, data).then((data) => {
//       setCursos(data), (data);
//     });
//   }

//   //PAGINADOR ---------------------

//   function eliminar(ID) {
//     ConfirmAlert().then((response) => {
//       if (response === true) {
//         var url = "TASKS/coe-updateState.php";
//         var operationUrl = "updateStateCursos";
//         var data = { ID: ID, usuario: userData.username };
//         SendDataService(url, operationUrl, data).then((response) => {
//           const { successEdited } = response[0];
//           TopAlerts(successEdited);
//         });
//       }
//     });
//   }
//   function insertarCurso() {
//     setIsActiveInsertCurso(!isActiveInsertCurso);
//   }
//   // function editarCurso(ID) {
//   //   setIsActiveEditCurso(true);
//   //   setIDCurso(ID);
//   // }

//   useEffect(
//     function () {
//       obtenerDatosPaginador();
//       handleChangePaginador();
//     },
//     [num_boton]
//   );

//   return userData.statusConected || userData !== null ? (
//     <>
//       <Header></Header>
//       <br></br>
//       <br></br>
//       <Container id="fondoTabla">
//         <div id="containerTablas">
//           <h1 id="TitlesPages">Listado de cursos por sesiones</h1>
//           <Button id="btnCursoListado" onClick={insertarCurso}>
//             Insertar Curso
//           </Button>
//           <InsertarCurso
//             isActiveCurso={isActiveInsertCurso}
//             cambiarEstado={setIsActiveInsertCurso}
//           ></InsertarCurso>

//           {/* <EditarCurso
//             isActiveEditCurso={isActiveEditCurso}
//             cambiarEstado={setIsActiveEditCurso}
//             IDCurso={IDCurso}
//           ></EditarCurso> */}
//         </div>
//         <Table id="mainTable" hover responsive>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Código del curso</th>
//               <th>Código de la Cuenta</th>
//               <th>Nombre del curso</th>
//               <th>Sesión</th>
//               <th>Inicio</th>
//               <th>Fin</th>
//               <th>Estado</th>
//               <th>Operaciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cursos.map((curso) => (
//               <tr key={curso.ID}>
//                 <td>{curso.ID}</td>
//                 <td>{curso.codigoCurso}</td>
//                 <td>{curso.codigoCuenta}</td>
//                 <td>{curso.nombreRamo}</td>
//                 <th>{curso.sesion}</th>
//                 <td>{curso.inicio}</td>
//                 <td>{curso.fin}</td>
//                 <td>{curso.estado}</td>
//                 <td>
//                   {/* <button
//                     title="Editar curso"
//                     id="OperationBtns"
//                     onClick={() => editarCurso(curso.ID)}
//                   >
//                     <RiEditBoxFill id="icons" />
//                   </button> */}
//                   {/* <Link to={`/Examinar/${curso.codigoCurso}`} >
//                     <button title="Examinar curso" id="OperationBtns">
//                       <HiEye id="icons" />
//                     </button>
//                   </Link> */}
//                   <button
//                     style={{marginLeft:32}}
//                     title="Eliminar curso"
//                     onClick={() => eliminar(curso.ID)}
//                     id="OperationBtns"
//                   >
//                     <BsFillTrashFill id="icons" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//         <Paginador
//           paginas={paginador}
//           cambiarNumero={setNumBoton}
//           num_boton={num_boton}
//         ></Paginador>
//       </Container>
//     </>
//   ) : (
//     <Navigate to="/login"></Navigate>
//   );
// }
