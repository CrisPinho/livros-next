//import type { NextPage } from "next";
//import React from "react";
//const LivroDados: NextPage = () => { return (<main>Ola mundo</main>)}

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Menu } from '../componentes/Menu'; 
import ControleEditora from '../classes/controle/ControleEditora'; 
import { Livro } from '../classes/modelo/Livro'; 
import styles from '../styles/Home.module.css';

const controleEditora = new ControleEditora();

const baseURL = "http://localhost:3000/api/livros";

const incluirLivro = async (livro: Livro) => {
  const response = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(livro),
  });
  return response.ok;
};

const LivroDados: React.FC = () => {
  const [titulo, setTitulo] = useState<string>('');
  const [resumo, setResumo] = useState<string>('');
  const [autores, setAutores] = useState<string>('');
  const [codEditora, setCodEditora] = useState<number>(0);
  const [opcoes, setOpcoes] = useState<{ value: number; text: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const editoras = controleEditora.getEditoras().map((editora) => ({
      value: editora.codEditora,
      text: editora.nome,
    }));
    setOpcoes(editoras);
  }, []);

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const livro: Livro = {
      codigo: 0, 
      titulo,
      resumo,
      autores: autores.split('\n'), 
      codEditora,
    };

    const sucesso = await incluirLivro(livro);
    if (sucesso) {
      router.push('/LivroLista'); 
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Loja Next - Cadastro de Livro</title>
      </Head>

      <Menu />

      <main className={styles.main}>
        <h1 className={styles.title}>Cadastrar Livro</h1>
        <form onSubmit={incluir}>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="resumo" className="form-label">Resumo</label>
            <textarea
              className="form-control"
              id="resumo"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="autores" className="form-label">Autores (um por linha)</label>
            <textarea
              className="form-control"
              id="autores"
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="codEditora" className="form-label">Editora</label>
            <select
              id="codEditora"
              className="form-select"
              value={codEditora}
              onChange={tratarCombo}
            >
              {opcoes.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Cadastrar</button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
