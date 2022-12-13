import { Card } from "react-bootstrap";
import { TbCertificate } from "react-icons/tb";
import "../../css/Certificados.css";
export default function Certificados() {
  return (
    <>
      <Card style={{ border: "none" }}>
        <Card.Body id="containerCertificados">
          <Card id="cards">
            <Card.Body>
              <Card.Title>
                <TbCertificate></TbCertificate>
              </Card.Title>
              <Card.Text>Certificados y diplomas</Card.Text>
              <Card.Text>Puedes ver y descargar tus certificados</Card.Text>
            </Card.Body>
          </Card>
          <Card id="cards">
            <Card.Body>
              <Card.Title>
                <TbCertificate></TbCertificate>
              </Card.Title>
              <Card.Text>Certificados y diplomas</Card.Text>
              <Card.Text>Puedes ver y descargar tus certificados</Card.Text>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </>
  );
}
