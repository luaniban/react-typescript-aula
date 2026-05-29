// ============================================================
// SOLUÇÃO: Interfaces para respostas de API
// Typos e campos errados são pegos em desenvolvimento
// ============================================================

interface Categoria {
  id: number;
  titulo: string;
}

interface Produto {
  id: number;
  nome: string;        // não "nme"
  preco: number;       // não "price"
  emEstoque: boolean;  // não "em_estoque"
  categoria: Categoria | null;
  imagens: Array<{ src: string; alt: string }>;
  descricao: string;
  precoAtual: number;
}

interface RespostaAPI {
  produtos: Produto[];  // não "itens"!
  total: number;
  pagina: number;
}

async function carregarProdutos(): Promise<Produto[]> {
  const res = await fetch("/api/produtos");
  const dados: RespostaAPI = await res.json();

  return dados.produtos.map((p) => ({
    id: p.id,
    nome: p.nome,           // nome correto
    preco: p.preco,         // nome correto
    emEstoque: p.emEstoque, // nome correto

    // p.nme          ← ERRO: Property 'nme' does not exist on type 'Produto'
    // p.price        ← ERRO: Property 'price' does not exist on type 'Produto'
    // p.em_estoque   ← ERRO: Property 'em_estoque' does not exist on type 'Produto'
  }));
}

// ─────────────────────────────────────────
async function mostrarProduto(id: number): Promise<void> {
  const res = await fetch(`/api/produtos/${id}`);
  const produto: Produto = await res.json();

  // Autocompletar no VS Code sugere os campos certos!
  console.log(produto.descricao);   // existe na interface
  console.log(produto.precoAtual);  // existe na interface

  // produto.imgs       ← ERRO: Property 'imgs' does not exist. Did you mean 'imagens'?
  // produto.descricao_ ← ERRO: Property 'descricao_' does not exist

  // Acesso seguro a array e nullable
  if (produto.imagens.length > 0) {
    console.log(produto.imagens[0].src);  // seguro
  }
  if (produto.categoria) {
    console.log(produto.categoria.titulo); // TypeScript sabe que não é null aqui
  }
}
