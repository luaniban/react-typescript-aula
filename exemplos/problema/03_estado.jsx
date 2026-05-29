// ============================================================
// PROBLEMA: useState sem tipo — null safety ignorado
// JS não avisa que você pode estar acessando null
// ============================================================

import React, { useState, useEffect } from "react";

function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null); // null inicial — mas JS não liga

  useEffect(() => {
    fetch("/api/usuario/1")
      .then((res) => res.json())
      .then(setUsuario);
  }, []);

  // Sem erro no editor, mas QUEBRA se usuario ainda for null:
  return (
    <div>
      <h1>{usuario.nome}</h1>          {/* TypeError: Cannot read properties of null */}
      <p>{usuario.email}</p>
      <img src={usuario.avatar.url} /> {/* Dois níveis de null — JS não avisa! */}
    </div>
  );
}

// ─────────────────────────────────────────
// Outro exemplo: setando tipo errado no estado
function Contador() {
  const [count, setCount] = useState(0);

  // JS aceita setar string em estado que deveria ser number
  const incrementar = () => setCount(count + "1"); // "01", "011", "0111"...

  return <button onClick={incrementar}>{count}</button>;
}
