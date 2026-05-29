// ============================================================
// SOLUÇÃO: Props tipadas com interface
// TypeScript garante que o componente recebe os dados corretos
// ============================================================

import React from "react";

// Interface define exatamente o que o componente espera
interface CartaoProdutoProps {
  nome: string;
  preco: number;
  quantidade: number;
  onClick: () => void;
}

function CartaoProduto({ nome, preco, quantidade, onClick }: CartaoProdutoProps) {
  return (
    <div onClick={onClick}>
      <h2>{nome}</h2>
      <p>Preço: R$ {preco.toFixed(2)}</p>
      <p>Total: R$ {(preco * quantidade).toFixed(2)}</p>
    </div>
  );
}

// ─────────────────────────────────────────
// Agora o TypeScript pega os erros na hora de usar o componente:

// Uso correto — sem erros
<CartaoProduto nome="Camiseta" preco={29.9} quantidade={3} onClick={() => {}} />;

// <CartaoProduto nome="Camiseta" preco="29.90" quantidade={3} onClick={() => {}} />;
// ERRO: Type 'string' is not assignable to type 'number'

// <CartaoProduto preco={29.9} quantidade={3} onClick={() => {}} />;
// ERRO: Property 'nome' is missing in type ... but required in type 'CartaoProdutoProps'

// <CartaoProduto nome="Camiseta" preco={29.9} quantidade={3} />;
// ERRO: Property 'onClick' is missing in type ...

// <CartaoProduto nome="Camiseta" preco={29.9} quantidade={3} onClick="clique" />;
// ERRO: Type 'string' is not assignable to type '() => void'

// ─────────────────────────────────────────
// Bônus: props opcionais com "?"
interface CardProps {
  titulo: string;
  subtitulo?: string;   // opcional — pode não ser passado
  imagem?: string;      // opcional
}

function Card({ titulo, subtitulo, imagem }: CardProps) {
  return (
    <div>
      {imagem && <img src={imagem} alt={titulo} />}
      <h2>{titulo}</h2>
      {subtitulo && <p>{subtitulo}</p>}
    </div>
  );
}

// Sem subtitulo e sem imagem — ok, são opcionais
<Card titulo="React com TypeScript" />;
