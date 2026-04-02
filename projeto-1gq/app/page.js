import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      
      <div className={styles.imageContainer}>
        <Image
          src="/foto-perfil.jpg" 
          alt="Foto de perfil de Bruno"
          width={400} 
          height={400} 
          className={styles.profileImage}
        />
      </div>

      <h1 className={styles.title}>
        Bruno Ferreira de Andrade Lyra
      </h1>
      
      <p className={styles.description}>
        Me chamo Bruno. Tenho 20 anos. Atualmente estou cursando o 5º período de Ciência da Computação na UNICAP.
      </p>

      {/* --- SEÇÃO DE PROJETOS ADICIONADA --- */}
      <div className={styles.projetosContainer}>
        <h2 className={styles.subtitle}>Meus Projetos</h2>
        
        {/* Esse Link vai apontar para a pasta do jogo que vamos criar */}
        <Link href="/forca" className={styles.botaoProjeto}>
           Jogar Jogo da Forca
        </Link>
      </div>

    </main>
  );
}