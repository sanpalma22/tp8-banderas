import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.titulo}>BANDERAS ROJAS, BANDERAS NEGRAS</h1>
        <Link className={styles.btnJugar} href={"/juego"}>Jugar!</Link>
        <Link className={styles.btnJugar} href={"/tabla"}>Tabla de puntaje</Link>
      </div>
    </main>
  );
}
