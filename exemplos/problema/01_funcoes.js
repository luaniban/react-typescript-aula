// ============================================================
// PROBLEMA: JavaScript não verifica tipos
// Abra este arquivo no VS Code — nenhum erro será mostrado!
// ============================================================

// Função sem tipos — qualquer valor é aceito
function calcularDesconto(preco, desconto) {
  return preco - preco * desconto;
}

console.log(calcularDesconto(100, 0.1));    // 90 — correto
console.log(calcularDesconto(100, "10%"));  // NaN — sem nenhum aviso!
console.log(calcularDesconto("cem", 0.1));  // NaN — sem nenhum aviso!
console.log(calcularDesconto(100));         // NaN — faltou argumento, sem aviso!

// ─────────────────────────────────────────
// Typo no nome do parâmetro — JS aceita sem reclamar
function criarUsuario(nome, emial, idade) {  // "emial" em vez de "email"!
  return { nome, emial, idade };
}

const usuario = criarUsuario("Ana", "ana@email.com", 25);

console.log(usuario.email);   // undefined — o typo passou sem aviso!
console.log(usuario.emial);   // "ana@email.com" — nome errado na propriedade
