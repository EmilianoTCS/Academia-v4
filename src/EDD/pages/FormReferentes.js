import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "../css/formStyle.css";
import Header from "../../components/templates/Header";
import SendDataService from "../../services/SendDataService";
import TopAlerts from "../../components/templates/alerts/TopAlerts";
import Container from "react-bootstrap/Container";

const FormReferentes = () => {
  //  // ----------------------CONSTANTES----------------------------
  const [nombApellido, setNombApellido] = useState([""]);
  const [nombApellidoClienteEvaluado, setNombApellidoClienteEvaluado] =
    useState([""]);
  const [nivelComunicacionCE, setNivelComunicacionCE] = useState("");
  const [criticasFundamentadasCE, setCriticasFundamentadasCE] = useState("");
  const [decisionesObjetivamenteCE, setDecisionesObjetivamenteCE] =
    useState("");
  const [responsableDeResultadosCE, setResponsableDeResultadosCE] =
    useState("");
  const [comunicarConLibertadCE, setComunicarConLibertadCE] = useState("");
  const [reconocerEsfuerzoCE, setReconocerEsfuerzoCE] = useState("");
  const [conocimientoNegocioCE, setConocimientoNegocioCE] = useState("");
  const [gestionarOrganizarCE, setGestionarOrganizarCE] = useState("");
  const [actividadesEncomendadasCE, setActividadesEncomendadasCE] =
    useState("");
  const [influirGrupoTrabajoCE, setInfluirGrupoTrabajoCE] = useState("");
  const [indiqueReclamosEtcCE, setIndiqueReclamosEtcCE] = useState("");
  const [nombApellidoReferenteTSoft, setNombApellidoReferenteTSoft] =
    useState("");
  const [apoyoRefTSoft, setApoyoRefTSoft] = useState("");
  const [actividadesEncomendadasRef, setActividadesEncomendadasRef] =
    useState("");
  const [poseeConocimientosRef, setPoseeConocimientosRef] = useState("");
  const [participacionJefeProyecto, setParticipacionJefeProyecto] =
    useState("");
  const [apoyoJefeProyecto, setApoyoJefeProyecto] = useState("");
  const [indiqueReclamosEtc, setIndiqueReclamosEtc] = useState("");

  //  // ----------------------FUNCIONES----------------------------

  function SendData(e) {
    e.preventDefault();
    const url = "EDD/creacion/InsertarResultadosReferentes.php";
    const operationUrl = "insertarResultadosReferentes";
    var data = {
      nombApellido: nombApellido,
      nombApellidoClienteEvaluado: nombApellidoClienteEvaluado,
      nivelComunicacionCE: nivelComunicacionCE,
      criticasFundamentadasCE: criticasFundamentadasCE,
      decisionesObjetivamenteCE: decisionesObjetivamenteCE,
      responsableDeResultadosCE: responsableDeResultadosCE,
      comunicarConLibertadCE: comunicarConLibertadCE,
      reconocerEsfuerzoCE: reconocerEsfuerzoCE,
      conocimientoNegocioCE: conocimientoNegocioCE,
      gestionarOrganizarCE: gestionarOrganizarCE,
      actividadesEncomendadasCE: actividadesEncomendadasCE,
      influirGrupoTrabajoCE: influirGrupoTrabajoCE,
      indiqueReclamosEtcCE: indiqueReclamosEtcCE,
      nombApellidoReferenteTSoft: nombApellidoReferenteTSoft,
      apoyoRefTSoft: apoyoRefTSoft,
      actividadesEncomendadasRef: actividadesEncomendadasRef,
      poseeConocimientosRef: poseeConocimientosRef,
      participacionJefeProyecto: participacionJefeProyecto,
      apoyoJefeProyecto: apoyoJefeProyecto,
      indiqueReclamosEtc: indiqueReclamosEtc,
    };

    
    SendDataService(url, operationUrl, data).then((response) => {
      TopAlerts(response);
      
    });
  }

  return (
    <>
      <Header></Header>
      <body id="fondo">
        <Container id="containerStyle">
          <br></br>
          <br></br>
          <Container id="textStyle">
            <p>
              <strong>COE CHILE - EVALUACIÓN REFERENTES - SERVICIO</strong>
              <br></br> <br></br>- Califique el desempeño de/los
              Analistas/Automatizadores que tiene a su cargo de acuerdo a su
              percepción utilizando los siguientes parámetros :<br></br>
              <br></br>
              ***Debe completar una encuesta por cada Analista/Automatizador***
              <br></br>
              <br></br>
              No satisfactorio: No cumple con las expectativas<br></br>
              Medio : Cumple de forma esporádica con las expectativas.
              <br></br>
              Bueno : Cumple con las expectativas aunque posee aspectos por
              mejorar <br></br>
              Muy Bueno : Cumple a cabalidad con las expectativas
            </p>
          </Container>
          <div id="pruebaFondo">
            <Form onSubmit={SendData} id="formStyle">
              <h5>
                Hola, (NOMBRE USER). Cuando envíe este formulario, el
                propietario verá su nombre y dirección de correo electrónico.
                <br></br>
                <br></br>
                <div className="isRequired">Obligatorio</div>
                <br></br>
              </h5>
              <Container>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label id="fontSizeQuest" className="isRequired">
                    1.Indique su nombre y apellido
                  </Form.Label>
                  <Container id="widhtStyle">
                    <Form.Control
                      style={{
                        padding: 20,
                        borderColor: "gray",
                        marginTop: 30,
                        marginBottom: 30,
                      }}
                      type="text"
                      placeholder="Escriba su respuesta"
                      onChange={({ target }) => setNombApellido(target.value)}
                      required
                    />
                  </Container>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label id="fontSizeQuest" className="isRequired">
                    2.Nombre y apellido referente de Cliente Evaluado
                  </Form.Label>
                  <Container id="widhtStyle">
                    <Form.Control
                      style={{
                        padding: 20,
                        borderColor: "gray",
                        marginTop: 30,
                        marginBottom: 30,
                      }}
                      type="text"
                      placeholder="Escriba su respuesta"
                      onChange={({ target }) =>
                        setNombApellidoClienteEvaluado(target.value)
                      }
                      required
                    />
                  </Container>
                </Form.Group>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  3.¿Cuál es el nivel comunicación con el/la referente de
                  Cliente evaluad@? (Comunicación)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setNivelComunicacionCE(target.value)
                      }
                    >
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group1"
                        type={type}
                        id={`inline-${type}-1`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group1"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-3`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group1"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-4`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  4.¿El/La referente de Cliente evaluad@ admite criticas
                  fundamentadas? (Inteligencia Emocional)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setCriticasFundamentadasCE(target.value)
                      }
                    >
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group2"
                        type={type}
                        id={`inline-${type}-5`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group2"
                        type={type}
                        id={`inline-${type}-6`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group2"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-7`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group2"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-8`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  5.¿El/La referente de Cliente evaluad@ toma decisiones
                  objetivamente correctas? (Gestión)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setDecisionesObjetivamenteCE(target.value)
                      }
                    >
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group3"
                        type={type}
                        id={`inline-${type}-9`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group3"
                        type={type}
                        id={`inline-${type}-10`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group3"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-11`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group3"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-12`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  6.¿El/La referente de Cliente evaluad@ se hace responsable de
                  los resultados de sus propias decisiones? (Gestión)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setResponsableDeResultadosCE(target.value)
                      }
                    >
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group4"
                        type={type}
                        id={`inline-${type}-13`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group4"
                        type={type}
                        id={`inline-${type}-14`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group4"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-15`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group4"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-16`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  7.¿El/La Referente de Cliente evaluad@ permite comunicar con
                  libertad y respeto las diferencias en ideas y opiniones?
                  (Liderazgo Cualitativo)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setComunicarConLibertadCE(target.value)
                      }
                    >
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group5"
                        type={type}
                        id={`inline-${type}-17`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group5"
                        type={type}
                        id={`inline-${type}-18`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group5"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-19`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group5"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-20`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  8.¿El/La referente de Cliente evaluad@ es capaz de reconocer
                  el esfuerzo que realizan los demás y expresar a los miembros
                  del equipo la valoración de sus aportes y esfuerzos?
                  (Liderazgo Cualitativo)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setReconocerEsfuerzoCE(target.value)
                      }
                    >
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group6"
                        type={type}
                        id={`inline-${type}-21`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group6"
                        type={type}
                        id={`inline-${type}-22`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group6"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-23`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group6"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-24`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  9.De acuerdo a su percepción, usted considera que el/la
                  Referente de Cliente evaluad@ posee las condiciones técnicas y
                  conocimiento de negocio que permitan apoyar sus labores en
                  caso de ser requerido? (Gestión)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setConocimientoNegocioCE(target.value)
                      }
                    >
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group7"
                        type={type}
                        id={`inline-${type}-25`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group7"
                        type={type}
                        id={`inline-${type}-26`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group7"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-27`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group7"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-28`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  10.¿El/La referente de Cliente evaluad@ es capaz de gestionar
                  y organizar correctamente las asignaciones? (Gestión)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setGestionarOrganizarCE(target.value)
                      }
                    >
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group8"
                        type={type}
                        id={`inline-${type}-29`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group8"
                        type={type}
                        id={`inline-${type}-30`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group8"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-31`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group8"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-32`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  11.¿El/La referente de Cliente evaluad@ realiza el seguimiento
                  óptimo a las actividades encomendadas? (Gestión)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setActividadesEncomendadasCE(target.value)
                      }
                    >
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group9"
                        type={type}
                        id={`inline-${type}-33`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group9"
                        type={type}
                        id={`inline-${type}-34`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group9"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-35`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group9"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-36`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  12.¿El/La Referente de Cliente evaluad@ es capaz de influir
                  positivamente en el actuar del grupo de trabajo?(Liderazgo
                  Cualitativo)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setInfluirGrupoTrabajoCE(target.value)
                      }
                    >
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group10"
                        type={type}
                        id={`inline-${type}-37`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group10"
                        type={type}
                        id={`inline-${type}-38`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group10"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-39`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group10"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-40`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  13.Favor indíquenos observaciones, felicitaciones, reclamos
                  y/o sugerencias al set de preguntas asociadas al referente de
                  Cliente evaluad@. (Servicio)
                </Form.Label>
                <Container id="widhtStyle">
                  <Form.Control
                    style={{
                      padding: 20,
                      borderColor: "gray",
                      marginTop: 30,
                      marginBottom: 30,
                    }}
                    placeholder="Escriba su respuesta"
                    as="textarea"
                    rows={3}
                    onChange={({ target }) =>
                      setIndiqueReclamosEtcCE(target.value)
                    }
                    required
                  />
                </Container>

                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label id="fontSizeQuest" className="isRequired">
                    14.Indique el Nombre y apellido de su referente TSOFT
                  </Form.Label>
                  <Container id="widhtStyle">
                    <Form.Control
                      style={{
                        padding: 20,
                        borderColor: "gray",
                        marginTop: 30,
                        marginBottom: 30,
                      }}
                      type="text"
                      placeholder="Escriba su respuesta"
                      onChange={({ target }) =>
                        setNombApellidoReferenteTSoft(target.value)
                      }
                      required
                    />
                  </Container>
                </Form.Group>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  15.¿Cómo considera usted el apoyo del referente Tsoft?
                  (Servicio)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) => setApoyoRefTSoft(target.value)}
                    >
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group11"
                        type={type}
                        id={`inline-${type}-41`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group11"
                        type={type}
                        id={`inline-${type}-42`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group11"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-43`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group11"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-44`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  16.¿El/La referente Tsoft, realiza el seguimiento óptimo a las
                  actividades encomendadas? (Servicio)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setActividadesEncomendadasRef(target.value)
                      }
                    >
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group12"
                        type={type}
                        id={`inline-${type}-45`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group12"
                        type={type}
                        id={`inline-${type}-46`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group12"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-47`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group12"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-48`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  17.De acuerdo a su percepción, usted considera que el/la
                  Referente TSOFT posee las condiciones técnicas y conocimiento
                  de negocio que permitan apoyar sus labores en caso de ser
                  requerido? (Servicio)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setPoseeConocimientosRef(target.value)
                      }
                    >
                      {" "}
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group13"
                        type={type}
                        id={`inline-${type}-49`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group13"
                        type={type}
                        id={`inline-${type}-50`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group13"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-51`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group13"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-52`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  18.¿Cómo considera usted la participación en el servicio
                  del/la Jefe de proyecto Tsoft (Servicio)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setParticipacionJefeProyecto(target.value)
                      }
                    >
                      {" "}
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group14"
                        type={type}
                        id={`inline-${type}-53`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group14"
                        type={type}
                        id={`inline-${type}-54`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group14"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-55`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group14"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-56`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  19.¿Cómo considera usted el apoyo del/la Jefe de proyecto
                  Tsoft (Servicio){" "}
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setApoyoJefeProyecto(target.value)
                      }
                    >
                      {" "}
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group15"
                        type={type}
                        id={`inline-${type}-57`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group15"
                        type={type}
                        id={`inline-${type}-58`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group15"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-59`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group15"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-60`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  20.Favor indíquenos observaciones, felicitaciones, reclamos
                  y/o sugerencias al set de preguntas. (Servicio)
                </Form.Label>
                <Container id="widhtStyle">
                  <Form.Control
                    style={{
                      padding: 20,
                      borderColor: "gray",
                      marginTop: 30,
                      marginBottom: 30,
                    }}
                    placeholder="Escriba su respuesta"
                    onChange={({ target }) =>
                      setIndiqueReclamosEtc(target.value)
                    }
                    as="textarea"
                    rows={3}
                    required
                  />
                </Container>
              </Container>
              <button variant="primary" type="submit" id="enviar">
                Enviar
              </button>
            </Form>{" "}
          </div>
        </Container>
        <br></br>
        <br></br>
      </body>
    </>
  );
};
export default FormReferentes;
