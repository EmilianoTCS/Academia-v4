import React, { useState } from "react";

const Paginador = ({ paginas, cambiarNumero, num_boton }) => {
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    cambiarNumero(Number(event.target.value));
  };

  const handlePrevbtn = () => {
    cambiarNumero(num_boton - 1);
    if ((num_boton - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNextbtn = () => {
    cambiarNumero(num_boton + 1);

    if (num_boton + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  return (
    <>
      <div id="paginador">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={num_boton === 1 || num_boton < 1 ? true : false}
          >
            Prev
          </button>
        </li>
        {paginas.map((pagina) => {
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
        })}
        <li>
          <button
            onClick={handleNextbtn}
            disabled={num_boton === paginas.length ? true : false}
          >
            Sig
          </button>
        </li>
      </div>
    </>
  );
};
export default Paginador;
