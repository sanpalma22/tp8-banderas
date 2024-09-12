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
        if (clave.startsWith("puntaje_")) {
          const puntaje = localStorage.getItem(clave);
          const nombre = clave.replace("puntaje_", "");
          puntajesObtenidos.push({ nombre, puntaje: parseInt(puntaje) });
        }
      }

      setPuntajes(puntajesObtenidos);
    }

    obtenerPuntajes();
  }, []);

  return (
    <>
    <div className={styles.contenedor}>
      <h1>Tabla de puntaje</h1>    
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Jugador</th>
            <th>Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {puntajes.map((p, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{p.nombre}</td>
              <td>{p.puntaje}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}
