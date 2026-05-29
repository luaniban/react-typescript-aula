// ============================================================
// PROBLEMA: Props sem tipagem em componentes React
// JS não sabe quais props o componente espera receber
// ============================================================

import React from "react";

// Componente sem tipos de props
function CartaoProduto({ nome, preco, quantidade, onClick }) {
  return (
    <div onClick={onClick}>
      <h2>{nome}</h2>
      <p>Preço: R$ {preco.toFixed(2)}</p>   {/* Erro em runtime se preco não for number */}
      <p>Total: R$ {(preco * quantidade).toFixed(2)}</p>
    </div>
  );
}

// ─────────────────────────────────────────
// Nenhum erro no editor, mas tudo quebra em runtime:

// preco é string — .toFixed() não existe em string
<CartaoProduto nome="Camiseta" preco="29.90" quantidade={3} onClick={() => {}} />

// nome é undefined — componente renderiza "undefined"
<CartaoProduto preco={29.90} quantidade={3} onClick={() => {}} />

// preco e quantidade são undefined — NaN no cálculo
<CartaoProduto nome="Camiseta" />

// onClick não é função — erro ao clicar
<CartaoProduto nome="Camiseta" preco={29.90} quantidade={3} onClick="clique" />
