import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1>BANDERAS ROJAS, BANDERAS NEGRAS</h1>
        <Link className={styles.btnJugar} href={"/juego"}>Jugar!</Link>
      </div>
    </main>
  );
}
