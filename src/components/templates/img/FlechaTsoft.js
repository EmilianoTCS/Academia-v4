import Flecha from "../../../sources/tsoft-logo.png";
import FlechaWhite from "../../../sources/tsoft-logo - white.png";
import "../../css/imgFlechaTsoft.css";

const FlechaTsoft = () => {
  return (
    <>
      <img src={Flecha} alt="FlechaTsoft" height={26} id="flechaNormal"></img>
      <img
        src={FlechaWhite}
        alt="FlechaTsoft"
        height={26}
        id="flechaWhite"
      ></img>
    </>
  );
};
export default FlechaTsoft;
