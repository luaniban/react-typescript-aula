// ============================================================
// SOLUÇÃO: TypeScript pega os erros antes de rodar o código
// Experimente descomentar as linhas com erro — VS Code avisa!
// ============================================================

// Tipos explícitos nos parâmetros e no retorno
function calcularDesconto(preco: number, desconto: number): number {
  return preco - preco * desconto;
}

console.log(calcularDesconto(100, 0.1));   // 90

// calcularDesconto(100, "10%");
// ERRO: Argument of type 'string' is not assignable to parameter of type 'number'

// calcularDesconto("cem", 0.1);
// ERRO: Argument of type 'string' is not assignable to parameter of type 'number'

// calcularDesconto(100);
// ERRO: Expected 2 arguments, but got 1

// ─────────────────────────────────────────
// Interface garante nomes corretos de propriedades
interface Usuario {
  nome: string;
  email: string; // nome correto!
  idade: number;
}

function criarUsuario(nome: string, email: string, idade: number): Usuario {
  return { nome, email, idade };
}

const usuario = criarUsuario("Ana", "ana@email.com", 25);

console.log(usuario.email);  // "ana@email.com"

// console.log(usuario.emial);
// ERRO: Property 'emial' does not exist on type 'Usuario'.
//          Did you mean 'email'?
