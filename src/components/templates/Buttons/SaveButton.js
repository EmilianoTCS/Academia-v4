import "../../css/CustomButton.css";

export default function CustomButton(Props) {
  return (
    <>
      <input
        type="button"
        value="Guardar"
        id="btn_guardarFecha"
        onClick={Props}
      ></input>
    </>
  );
}
