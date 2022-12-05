import React, { useState, useEffect } from "react";

export default function Paginador(props) {
  const [num_boton, setNumBoton] = useState("");
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [paginador, setPaginador] = useState([]);

  const handleClick = (event) => {
    setNumBoton(Number(event.target.value));
  };
  useEffect(
    function () {
      setPaginador(props.Paginador);
      renderNumeros();
    },
    [paginador]
  );
  function renderNumeros() {
    paginador.map((pagina) => {
      if (
        pagina.paginas < maxPageNumberLimit + 1 &&
        pagina.paginas > minPageNumberLimit
      ) {
        return (
          <li key={pagina.paginas}>
            <button
              name="paginas"
              value={pagina.paginas}
              onClick={handleClick}
              className={num_boton === pagina.paginas ? "active" : null}
            >
              {pagina.paginas}
            </button>
          </li>
        );
      } else {
        return null;
      }
    });
  }

  const handlePrevbtn = () => {
    setNumBoton(num_boton - 1);
    if ((num_boton - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNextbtn = () => {
    setNumBoton(num_boton + 1);

    if (num_boton + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const pageDecrementBtn = () => {
    if (minPageNumberLimit > 1) {
      return (
        <li>
          <button onClick={handlePrevbtn}> hola</button>
        </li>
      );
    }
  };

  return (
    <>
      <div id="paginador">
        {/* <li>
          <button
            onClick={handlePrevbtn}
            disabled={
              num_boton === paginador[0].paginas ||
              num_boton < paginador[0].paginas
                ? true
                : false
            }
          >
            Prev
          </button>
        </li> */}
        {pageDecrementBtn}
        {renderNumeros}
        {/* <li>
          <button
            onClick={handleNextbtn}
            disabled={
              num_boton === paginador[paginador.length - 1] ? true : false
            }
          >
            Next
          </button>
        </li> */}
      </div>
    </>
  );
}
