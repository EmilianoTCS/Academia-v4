import { Card, Form } from "react-bootstrap";
import { Redirect } from "wouter";
import Header from "../templates/Header";

import React, { useState, useEffect } from "react";

export default function InscribirseCurso() {
  // ----------------------CONSTANTES----------------------------

  const userData = localStorage.getItem("loggedUser");

  return userData ? (
    <>
      <Header></Header>
      <h1 id="TitlesPages">Inscripción de cursos</h1>
      <Form>
        <Card></Card>
      </Form>
    </>
  ) : (
    <>
      <Redirect to="/login"></Redirect>
    </>
  );
}
