import { useRoute } from "wouter";
import Header from "../../templates/Header";

export default function Curso(){

    const [match, params] = useRoute("/test/:params");
    const userData = localStorage.getItem("loggedUser");

    console.log(params.params);

    return userData ? (
        <>
          <Header></Header>
          <div>
            <div id="containerTablas">
              <h1 id="TitlesPages">Listado de cursos</h1>
              <Button id="btnCursoListado" onClick={insertarCurso}>
                Insertar Curso
              </Button>
              <Button id="btnCursoListado" onClick={insertarRamo}>
                Insertar Ramos
              </Button>
              <InsertarCurso
                isActiveCurso={isActiveInsertCurso}
                cambiarEstado={setIsActiveInsertCurso}
              ></InsertarCurso>
              <InsertarRamo
                isActiveRamo={isActiveInsertRamo}
                cambiarEstado={setIsActiveInsertRamo}
              ></InsertarRamo>
              {/* <EditarCurso Props={{ IDCurso, isActiveEditCurso }}></EditarCurso> */}
            </div>
            <Table id="mainTable" hover responsive>
              <thead>
                <tr>
                  <th>Código del curso</th>
                  <th>Código de la Cuenta</th>
                  <th>Nombre del curso</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Estado</th>
                  <th>Operaciones</th>
                </tr>
              </thead>
              <tbody>
                {cursos.map((curso) => (
                  <tr key={curso.ID}>
                    <td>{curso.codigoCurso}</td>
                    <td>{curso.codigoCuenta}</td>
                    <td>{curso.nombreRamo}</td>
                    <td>{curso.inicio}</td>
                    <td>{curso.fin}</td>
                    <td>{curso.estado}</td>
                    <td>
                      <button
                        title="Editar curso"
                        id="OperationBtns"
                        onClick={() => editarCurso(curso.ID)}
                      >
                        <BsPencilSquare />
                      </button>
                      <Link to={`/test/${curso.codigoCurso}`} ><button title="Examinar curso" id="OperationBtns">
                        <BiShowAlt />
                      </button></Link>
                      <button
                        title="Eliminar curso"
                        onClick={() => eliminar(curso.ID)}
                        id="OperationBtns"
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginador
              paginas={paginador}
              cambiarNumero={setNumBoton}
              num_boton={num_boton}
            ></Paginador>
          </div>
        </>
      ) : (
        <Redirect to="/login"></Redirect>
      );
}