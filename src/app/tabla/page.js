"use client";
import { useEffect, useState } from "react";
import styles from "./tabla.module.css";
export default function Tabla() {
  const [puntajes, setPuntajes] = useState([]);

  useEffect(() => {
    function obtenerPuntajes() {
      const puntajesObtenidos = [];

      for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i);
        console.log(clave);
        const puntaje = localStorage.getItem(clave);
        console.log(puntaje);
        puntajesObtenidos.push({ nombre: clave, puntaje: parseInt(puntaje) });

        setPuntajes(puntajesObtenidos);
        console.log(puntajes);
      }
    }
    obtenerPuntajes();
  }, []);

  return (
    <>
      <h1>Bienvenido</h1>
      {puntajes.forEach((p) => {<p>{p.nombre}</p>})}
    </>
  );
}
