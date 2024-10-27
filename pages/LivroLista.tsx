//import type { NextPage } from "next";
//import React from "react";
//const LivroLista: NextPage = () => { return (<main>Ola mundo</main>)}

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Menu } from '../componentes/Menu'; 
import { LinhaLivro } from '../componentes/LinhaLivro'; 
import { Livro } from '../classes/modelo/Livro'; 
import styles from '../styles/Home.module.css';

const baseURL = "http://localhost:3000/api/livros";

const obterLivros = async () => {
  const response = await fetch(baseURL);
  return await response.json();
};

const excluirLivro = async (codigo: number) => {
  const response = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
  return response.ok;
};

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState<boolean>(false);

  useEffect(() => {
    if (!carregado) {
      obterLivros()
        .then((data) => {
          setLivros(data);
          setCarregado(true);
        })
        .catch((error) => console.error("Erro ao carregar livros:", error));
    }
  }, [carregado]);

  const excluir = (codigo: number) => {
    excluirLivro(codigo)
      .then((sucesso) => {
        if (sucesso) setCarregado(false);
      })
      .catch((error) => console.error("Erro ao excluir livro:", error));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Loja Next - Lista de Livros</title>
      </Head>

      <Menu />

      <main className={styles.main}>
        <h1 className={styles.title}>Lista de Livros</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Editora</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <LinhaLivro
                key={livro.codigo}
                livro={livro}
                excluir={() => excluir(livro.codigo)}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
