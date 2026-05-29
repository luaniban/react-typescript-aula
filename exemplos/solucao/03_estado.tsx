// ============================================================
// SOLUÇÃO: useState tipado — TypeScript obriga tratar null
// O compilador não deixa você esquecer de verificar o estado
// ============================================================

import React, { useState, useEffect } from "react";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  avatar?: {   // opcional — pode não existir
    url: string;
    alt: string;
  };
}

function PerfilUsuario() {
  // TypeScript sabe que usuario pode ser Usuario ou null
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch("/api/usuario/1")
      .then((res) => res.json())
      .then((dados: Usuario) => {
        setUsuario(dados);
        setCarregando(false);
      });
  }, []);

  // usuario.nome  ← ERRO: ERRO antes do if: Object is possibly 'null'
  // TypeScript obriga você a tratar o caso null!

  if (carregando) return <p>Carregando...</p>;
  if (!usuario) return <p>Usuário não encontrado</p>;

  // Aqui TypeScript já sabe que usuario não é null
  return (
    <div>
      <h1>{usuario.nome}</h1>
      <p>{usuario.email}</p>
      {/* avatar é opcional — precisa verificar antes de acessar */}
      {usuario.avatar && <img src={usuario.avatar.url} alt={usuario.avatar.alt} />}
    </div>
  );
}

// ─────────────────────────────────────────
// Contador com tipo correto
function Contador() {
  const [count, setCount] = useState<number>(0);

  // setCount("1")  ← ERRO: Argument of type 'string' is not assignable to 'number'
  const incrementar = () => setCount(count + 1); // sempre number

  return <button onClick={incrementar}>{count}</button>;
}
