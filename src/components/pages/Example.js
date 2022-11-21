import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

export default function Example() {
  const [value, setValue] = useState([new DateObject()]);
  const fechasFormateadas = [];

  function handleChange(values) {
    setValue(values);
  }
  function mapeado() {
    value.map((item, index) => fechasFormateadas.push(value[index].format()));
    console.log(fechasFormateadas);
  }

  function CustomButton() {
    return (
      <>
        {" "}
        <input type="button" value="Guardar" onClick={mapeado}></input>
      </>
    );
  }
  return (
    <DatePicker
      format="YYYY-MM-DD"
      value={value}
      multiple
      onChange={handleChange}
      plugins={[<DatePanel></DatePanel>, <CustomButton position="bottom" />]}
    />
  );
}
