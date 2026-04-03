// app/page.js
"use client";

import { useState, useEffect } from 'react';
import { palavras, codigosBandeiras } from './utils/palavras';
import styles from './page.module.css';

const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");


export default function JogoDaForca() {
  const [palavraAtual, setPalavraAtual] = useState("");
  const [letrasTentadas, setLetrasTentadas] = useState([]);
  const [erros, setErros] = useState(0);
  const [statusDoJogo, setStatusDoJogo] = useState("jogando"); 

  const iniciarNovoJogo = () => {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    setPalavraAtual(palavras[indiceAleatorio]);
    setLetrasTentadas([]);
    setErros(0);
    setStatusDoJogo("jogando");
  };

  // Sorteia a primeira palavra ao carregar a página
  useEffect(() => {
    iniciarNovoJogo();
  }, []);

  // --- ETAPA 6: VERIFICADOR DE VITÓRIA E DERROTA ---
  // Esse useEffect roda toda vez que 'letrasTentadas' ou 'erros' mudarem
  useEffect(() => {
    if (!palavraAtual) return; // Se a palavra ainda não carregou, ignora

    // Verifica Derrota: Se chegou a 6 erros (ou o limite das suas imagens)
    if (erros >= 6) {
      setStatusDoJogo("derrota");
      return;
    }

    // Verifica Vitória: Checa se TODAS as letras da palavra atual estão no array de tentadas
    const todasLetrasDescobertas = palavraAtual
      .split('')
      .every((letra) => letrasTentadas.includes(letra));

    if (todasLetrasDescobertas && letrasTentadas.length > 0) {
      setStatusDoJogo("vitoria");
    }
  }, [letrasTentadas, erros, palavraAtual]);


  const lidarComClique = (letra) => {
    if (letrasTentadas.includes(letra) || statusDoJogo !== "jogando") return;

    setLetrasTentadas((prev) => [...prev, letra]);

    if (!palavraAtual.includes(letra)) {
      setErros((prev) => prev + 1);
    }
  };

  if (!palavraAtual) {
    return (
      <main className={styles.main}>
        <p>Carregando jogo...</p>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1>Jogo da Forca - Países</h1>
      <div className={styles.topoContainer}>
        <Link href="/" className={styles.botaoVoltar}>
          ⬅ Voltar ao Portfólio
        </Link>
      </div>
      {/* Área da Forca e Boneco */}
      <div className={styles.forcaArea}>
        {/* Como você uniu a forca e o boneco na mesma imagem, podemos renderizar apenas a imagem do erro atual.
            Se erros for 0, podemos exibir um erro-0.png que seria só a forca vazia. */}
        <img 
          src={`/erro-${erros}.png`} 
          alt={`Forca com ${erros} erros`} 
          className={styles.imagemBase} 
        />
      </div>

      {/* A Palavra Oculta */}
      <div className={styles.palavraContainer}>
        {palavraAtual.split('').map((letra, index) => {
          const revelada = letrasTentadas.includes(letra) || statusDoJogo === "derrota";
          // Se o jogador perder, revelamos a palavra toda para ele ver qual era!
          
          return (
            <span key={index} className={styles.letraCaixa}>
              {revelada ? letra : ""}
            </span>
          );
        })}
      </div>

      {/* --- ETAPA 6: MENSAGEM DE FIM DE JOGO --- */}
      {statusDoJogo !== "jogando" && (
        <div className={styles.mensagemFim}>
          <h2 className={statusDoJogo === "vitoria" ? styles.textoVitoria : styles.textoDerrota}>
            {statusDoJogo === "vitoria" ? "Vitória!" : "Derrota!"}
          </h2>

          <img 
            src={`https://flagcdn.com/w160/${codigosBandeiras[palavraAtual]}.png`} 
            alt={`Bandeira do(a) ${palavraAtual}`} 
            className={styles.bandeira}
          />

          {/* Nome do País: Pegamos a palavra, deixamos minúscula e aumentamos só a primeira letra */}
          <p className={styles.nomePais}>
            {palavraAtual.charAt(0) + palavraAtual.slice(1).toLowerCase()}
          </p>

          <button onClick={iniciarNovoJogo} className={styles.botaoReiniciar}>
            Jogar Novamente
          </button>
        </div>
      )}
      {/* O Teclado Virtual */}
      <div className={styles.teclado}>
        {alfabeto.map((letra) => {
          const jaTentou = letrasTentadas.includes(letra);
          const acertou = jaTentou && palavraAtual.includes(letra);
          const errou = jaTentou && !palavraAtual.includes(letra);
          
          // Trava o teclado se o jogo não estiver mais rodando
          const tecladoTravado = statusDoJogo !== "jogando";

          return (
            <button
              key={letra}
              onClick={() => lidarComClique(letra)}
              disabled={jaTentou || tecladoTravado} 
              className={`
                ${styles.tecla} 
                ${acertou ? styles.teclaCorreta : ''} 
                ${errou ? styles.teclaErrada : ''}
              `}
            >
              {letra}
            </button>
          );
        })}
      </div>

    </main>
  );
}