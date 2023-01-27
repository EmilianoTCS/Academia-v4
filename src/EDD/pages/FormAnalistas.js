import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "../css/formStyle.css";
import Header from "../../components/templates/Header";

import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

const FormAnalistas = () => {
  const [nombApellido, setNombApellido] = useState([""]);
  const [nombApellidoAnalista, setNombApellidoAnalista] = useState([""]);
  const [analistaComunicaEfectiva, setAnalistaComunicaEfectiva] = useState("");
  const [analistaRecibirCriticas, setAnalistaRecibirCriticas] = useState("");
  const [analistaAnticipaHechos, setAnalistaAnticipaHechos] = useState("");
  const [analistaMuestraIniciativa, setAnalistaMuestraIniciativa] =
    useState("");
  const [analistaProponerSoluciones, setAnalistaProponerSoluciones] =
    useState("");
  const [analistaDeterminacion, setAnalistaDeterminacion] = useState("");
  const [analistaNegocio, setAnalistaNegocio] = useState("");
  const [analistaNuevosDesafios, setAnalistaNuevosDesafios] = useState("");
  const [analistaDesicionesCorrectas, setAnalistaDesicionesCorrectas] =
    useState("");
  const [analistaResponsableResultados, setAnalistaResponsableResultados] =
    useState("");
  const [analistaPropiasDesiciones, setAnalistaPropiasDesiciones] =
    useState("");
  const [analistaMetodologia, setAnalistaMetodologia] = useState("");
  const [analistaComunicarseLibertad, setAnalistaComunicarseLibertad] =
    useState("");
  const [analistaReconocerEsfuerzo, setAnalistaReconocerEsfuerzo] =
    useState("");
  const [analistaGestionarCorrectamente, setAnalistaGestionarCorrectamente] =
    useState("");
  const [analistaCapacidadAnalitica, setAnalistaCapacidadAnalitica] =
    useState("");
  const [analistaInfluirPositivamente, setAnalistaInfluirPositivamente] =
    useState("");
  const [analistaDesempeño, setAnalistaDesempeño] = useState("");
  const [analistaConocimientosTecnicos, setAnalistaConocimientosTecnicos] =
    useState("");
  const [analistaConocimientosNegocio, setAnalistaConocimientosNegocio] =
    useState("");
  const [observacionesReclamos, setObservacionesReclamos] = useState("");

  function SendData(e) {
    e.preventDefault();
    // const url = "TASKS/coe-insertarCurso.php";
    // const operationUrl = "insertarCurso";
    var data = {
      nombApellido: nombApellido,
      nombApellidoAnalista: nombApellidoAnalista,
      analistaComunicaEfectiva: analistaComunicaEfectiva,
      analistaRecibirCriticas: analistaRecibirCriticas,
      analistaAnticipaHechos: analistaAnticipaHechos,
      analistaMuestraIniciativa: analistaMuestraIniciativa,
      analistaProponerSoluciones: analistaProponerSoluciones,
      analistaDeterminacion: analistaDeterminacion,
      analistaNegocio: analistaNegocio,
      analistaNuevosDesafios: analistaNuevosDesafios,
      analistaDesicionesCorrectas: analistaDesicionesCorrectas,
      analistaResponsableResultados: analistaResponsableResultados,
      analistaPropiasDesiciones: analistaPropiasDesiciones,
      analistaMetodologia: analistaMetodologia,
      analistaComunicarseLibertad: analistaComunicarseLibertad,
      analistaReconocerEsfuerzo: analistaReconocerEsfuerzo,
      analistaGestionarCorrectamente: analistaGestionarCorrectamente,
      analistaCapacidadAnalitica: analistaCapacidadAnalitica,
      analistaInfluirPositivamente: analistaInfluirPositivamente,
      analistaDesempeño: analistaDesempeño,
      analistaConocimientosTecnicos: analistaConocimientosTecnicos,
      analistaConocimientosNegocio: analistaConocimientosNegocio,
      observacionesReclamos: observacionesReclamos,
    };
    console.log(data);
    // SendDataService(url, operationUrl, data).then((response) => {
    //   TopAlerts(response[0]);

    // });
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
              <strong>COE CHILE - EVALUACIÓN DE DESEMPEÑO</strong>
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
              <h4>
                <div className="isRequired">Obligatorio</div>
                <br></br>
              </h4>
              <Container>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label id="fontSizeQuest" className="isRequired">
                    1.Su Nombre y apellido
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
                    2.Nombre y apellido Analista / Automatizador evaluado
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
                        setNombApellidoAnalista(target.value)
                      }
                      required
                    />
                  </Container>
                </Form.Group>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  3.¿El/La analista se comunica de forma efectiva?
                  (Comunicación)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaComunicaEfectiva(target.value)
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
                  4.¿El/La analista reacciona de forma positiva al recibir
                  criticas? (Inteligencia Emocional)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaRecibirCriticas(target.value)
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
                  5.¿El/La analista / Automatizador se anticipa a los hechos?
                  (Proactividad)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaAnticipaHechos(target.value)
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
                  6.¿El/La analista / Automatizador muestra iniciativa?
                  (Proactividad)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaMuestraIniciativa(target.value)
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
                  7.¿El/La analista / Automatizador es capaz de proponer
                  soluciones? (Proactividad)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaProponerSoluciones(target.value)
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
                  8.¿El/La analista / Automatizador realiza su trabajo con
                  decisión y/o determinación? (Confianza)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaDeterminacion(target.value)
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
                  9.¿El/La analista / Automatizador es capaz de adquirir nuevas
                  habilidades y/o conocimientos por necesidad del negocio?
                  (Capacidad de Aprendizaje)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaNegocio(target.value)
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
                  10.¿El/La analista / Automatizador se muestra dispuesto(a) a
                  participar en nuevos desafíos? (Disposición/Actitud)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaNuevosDesafios(target.value)
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
                  11.¿El/La analista / Automatizador es capaz de tomar
                  decisiones objetivamente correctas? (Autonomía)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaDesicionesCorrectas(target.value)
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
                  12.¿El/La analista / Automatizador se hace responsable de los
                  resultados obtenidos por sus decisiones? (Autonomía)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaResponsableResultados(target.value)
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
                  13.¿El/La analista / Automatizador esta capacitado para tomar
                  sus propias decisiones y/o adquiere responsabilidades por sí
                  mismo? (Empoderamiento){" "}
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaPropiasDesiciones(target.value)
                      }
                    >
                      {" "}
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
                  14.¿El/La analista / Automatizador es capaz de trabajar
                  siguiendo una metodología? (Trabajo en Equipo)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaMetodologia(target.value)
                      }
                    >
                      {" "}
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
                  15.¿El analista / Automatizador es capaz de comunicarse con
                  libertad y respeto ante las diferencias en ideas e integrar
                  las diferencias? (Trabajo en Equipo)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaComunicarseLibertad(target.value)
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
                  16.¿El/La analista / Automatizador es capaz de reconocer el
                  esfuerzo que realizan los demás y expresar a los miembros del
                  equipo la valoración de sus aportes y esfuerzos? (Trabajo en
                  Equipo){" "}
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaReconocerEsfuerzo(target.value)
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
                  17.¿El/La analista / Automatizador es capaz de gestionar y
                  organizarse correctamente para cumplir con vuestros objetivos
                  bajo presión? (Trabajo bajo presión)
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaGestionarCorrectamente(target.value)
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
                  18.¿El/La analista / Automatizador presenta capacidad
                  analítica que involucre el sentido común? (Capacidad
                  Analitica){" "}
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaCapacidadAnalitica(target.value)
                      }
                    >
                      {" "}
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group16"
                        type={type}
                        id={`inline-${type}-61`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group16"
                        type={type}
                        id={`inline-${type}-62`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group16"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-63`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group16"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-64`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  19.¿El/La analista / Automatizador es capaz de influir
                  positivamente en el actuar del grupo de trabajo?(Liderazgo
                  Cualitativo){" "}
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaInfluirPositivamente(target.value)
                      }
                    >
                      {" "}
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group17"
                        type={type}
                        id={`inline-${type}-65`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group17"
                        type={type}
                        id={`inline-${type}-66`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group17"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-67`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group17"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-68`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  20.Categorice el desempeño del El/La analista / Automatizador
                  evaluado (Desempeño){" "}
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaDesempeño(target.value)
                      }
                    >
                      {" "}
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group18"
                        type={type}
                        id={`inline-${type}-69`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group18"
                        type={type}
                        id={`inline-${type}-70`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group18"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-71`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group18"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-72`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  21.Categorice el nivel de conocimientos técnicos que posee
                  El/La analista / Automatizador en el desempeño de su rol:
                  (Desempeño){" "}
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaConocimientosTecnicos(target.value)
                      }
                    >
                      {" "}
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group19"
                        type={type}
                        id={`inline-${type}-73`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group19"
                        type={type}
                        id={`inline-${type}-74`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group19"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-75`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group19"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-76`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  22.Categorice el nivel de conocimientos de negocio que posee
                  El/La analista / Automatizador en el desempeño de su rol:
                  (Desempeño){" "}
                </Form.Label>
                <Container id="checkStyle">
                  {["radio"].map((type) => (
                    <div
                      key={`inline-${type}`}
                      className="mb-3"
                      id="checkStyle"
                      onChange={({ target }) =>
                        setAnalistaConocimientosNegocio(target.value)
                      }
                    >
                      {" "}
                      <Form.Check
                        style={{ padding: 12 }}
                        label="No satisfactorio"
                        value="No satisfactorio"
                        name="group20"
                        type={type}
                        id={`inline-${type}-78`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        label="Medio"
                        value="Medio"
                        name="group20"
                        type={type}
                        id={`inline-${type}-79`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group20"
                        label="Bueno"
                        value="Bueno"
                        type={type}
                        id={`inline-${type}-80`}
                        required
                      />
                      <Form.Check
                        style={{ padding: 12 }}
                        name="group20"
                        label="Muy Bueno"
                        value="Muy Bueno"
                        type={type}
                        id={`inline-${type}-81`}
                        required
                      />
                    </div>
                  ))}
                </Container>

                <Form.Label id="fontSizeQuest" className="isRequired">
                  23.Favor indíquenos observaciones, reclamos, felicitaciones
                  adicionales al set de preguntas.
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
                      setObservacionesReclamos(target.value)
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
      </body>
    </>
  );
};
export default FormAnalistas;
