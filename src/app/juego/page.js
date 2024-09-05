"use client";
import { useEffect, useState } from "react";
import styles from "./juego.module.css";

export default function Juego() {
  const [banderas, setBanderas] = useState([]);
  const [bandera, setBandera] = useState({});
  const [nivel, setNivel]= useState(1)
  const [respuesta, setRespuesta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [puntaje, setPuntaje] = useState(1);


  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((res) => res.json())
      .then((data) => setBanderas(data.data));
  }, []);

  useEffect(() => {
    if (banderas.length > 0) {
      generarBandera();
    }
  }, [banderas]);

  const handleChange = (e) => {
    const value = e.target.value;
    setRespuesta(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correcta = verificarRespuesta();
    setMensaje(correcta ? "¡Correcto!" : "Incorrecto");
    setPuntaje(correcta ? puntaje + 10 : puntaje > 0 ? puntaje - 3 : puntaje);
    setNivel(nivel+1)

    generarBandera();
    setRespuesta("");
  };

  function generarBandera() {
    const rdm = Math.floor(Math.random() * banderas.length);
    setBandera(banderas[rdm]);
    console.log(banderas[rdm])
  }

  function verificarRespuesta() {
    if (respuesta.toLowerCase() == bandera.name.toLowerCase()) {
      return true;
    } else return false;
  }

  return (
    <>
      <div className={styles.puntajeContainer}>
        <span className={styles.puntaje}>{puntaje} puntos</span>
      </div>

      <div className={styles.contenedor}>
        <div className={styles.container}>
          <img src={bandera.flag} className={styles.flag_image} alt="Bandera" />

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                type="text"
                onChange={handleChange}
                value={respuesta}
                placeholder="Escribe tu respuesta"
              />
              <button className={styles.button} type="submit">
                Adivinar
              </button>
            </div>
          </form>

          <div className={styles.message}>{mensaje}</div>
        </div>
      </div>
    </>
  );
}
