"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import styles from "./juego.module.css";

export default function Juego() {
  const [banderas, setBanderas] = useState([]);
  const [bandera, setBandera] = useState({});
  const [nivel, setNivel] = useState(1);
  const [respuesta, setRespuesta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [user, setUser] = useState("");
  const [puntaje, setPuntaje] = useState(0);
  const router = useRouter(); 

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((res) => res.json())
      .then((data) => {
        const banderasFiltradas = data.data.filter((b) => b.name.length <= 20);
        setBanderas(banderasFiltradas);
      });
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
    setPuntaje(correcta ? puntaje + 10 : puntaje >=3 ? puntaje - 3 : puntaje);
    setNivel(nivel + 1);
    generarBandera();
    setRespuesta("");
  };

  const handleChangeUser = (e) => {
    const value = e.target.value;
    setUser(value);
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();
    localStorage.setItem(`puntaje_${user}`, {puntaje,user});
    router.push("/"); 
  };

  function generarBandera() {
    const rdm = Math.floor(Math.random() * banderas.length);
    setBandera(banderas[rdm]);
    console.log(banderas[rdm]);
  }

  function verificarRespuesta() {
    return respuesta.toLowerCase() === bandera.name.toLowerCase();
  }

  if (nivel <= 10) {
    return (
      <div className={styles.contenedor}>
        <div className={styles.nivelContainer}>
          <span className={styles.nivel}>Bandera {nivel}</span>
        </div>

        <div className={styles.puntajeContainer}>
          <span className={styles.puntaje}>{puntaje} puntos</span>
        </div>
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
    );
  } else {
    return (
      <div className={styles.contenedor}>
        <div className={styles.container}>
          <p>Juego terminado!</p>
          <p>{puntaje} puntos</p>
          <form onSubmit={handleSubmitUser} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                type="text"
                onChange={handleChangeUser}
                value={user}
                placeholder="Escribe tu nombre aquí"
              />
              <button className={styles.button} type="submit">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
