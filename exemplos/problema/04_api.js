// ============================================================
// PROBLEMA: Respostas de API sem tipagem
// Typos e campos errados só aparecem em runtime
// ============================================================

async function carregarProdutos() {
  const res = await fetch("/api/produtos");
  const dados = await res.json(); // tipo: any — qualquer acesso é permitido!

  //  Todos esses erros passam sem aviso no editor:
  return dados.itens.map((p) => ({     // "itens" ou "produtos"? Ninguém sabe!
    id: p.id,
    nome: p.nme,                       // typo! retorna undefined
    preco: p.price,                    // campo em inglês que não existe
    disponivel: p.em_estoque,          // camelCase ou snake_case? Quem sabe!
    categoria: p.categoria.titulo,     // e se categoria for null?
  }));
}

// ─────────────────────────────────────────
// Função que usa a resposta — JS não sabe os tipos
async function mostrarProduto(id) {
  const res = await fetch(`/api/produtos/${id}`);
  const produto = await res.json();

  //  Campos com typo — resultado: undefined silencioso
  console.log(produto.descricao);    // existe? é "descricao" ou "description"?
  console.log(produto.preco_atual);  // "preco_atual" ou "precoAtual"?
  console.log(produto.imgs[0].src);  // "imgs" ou "imagens"? E se for vazio?
}
