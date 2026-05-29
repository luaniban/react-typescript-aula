export interface SlideData {
  id: number;
  titulo: string;
  subtitulo: string;
  descricao: string;
  resultadoJS: {
    resultado: string;
    problema: string;
  };
  codigoJS: string;
  codigoTS: string;
  pontos: string[];
}

export const slides: SlideData[] = [
  {
    id: 1,
    titulo: "Funções e Tipos",
    subtitulo: "JavaScript aceita qualquer valor, TypeScript garante o contrato",
    descricao:
      "No JavaScript, funções aceitam qualquer tipo de argumento sem reclamar. Isso gera bugs silenciosos que só aparecem em produção.",
    resultadoJS: {
      resultado: "NaN e undefined",
      problema: "Tipos errados e typos passam sem aviso até o código rodar.",
    },
    codigoJS: `// JavaScript — sem verificação de tipos
function calcularDesconto(preco, desconto) {
  return preco - preco * desconto;
}

// Tudo "funciona"... até quebrar em produção
calcularDesconto(100, 0.1);    // 90
calcularDesconto(100, "10%");  // NaN — sem aviso!
calcularDesconto("cem", 0.1);  // NaN — sem aviso!
calcularDesconto(100);         // NaN — faltou arg!

// Typo no parâmetro — JS não reclama
function criarUsuario(nome, emial, idade) {
  return { nome, emial, idade };
}
const u = criarUsuario("Ana", "ana@email.com", 25);
console.log(u.email);  // undefined — typo ignorado!`,
    codigoTS: `// TypeScript — erros pegos em desenvolvimento
function calcularDesconto(
  preco: number,
  desconto: number
): number {
  return preco - preco * desconto;
}

calcularDesconto(100, 0.1);   // 90

// calcularDesconto(100, "10%");
// ERRO: Argument of type 'string' is not assignable
//    to parameter of type 'number'

// calcularDesconto(100);
// ERRO: Expected 2 arguments, but got 1

interface Usuario {
  nome: string;
  email: string;  // nome correto!
  idade: number;
}
function criarUsuario(
  nome: string, email: string, idade: number
): Usuario {
  return { nome, email, idade };
}
const u = criarUsuario("Ana", "ana@email.com", 25);
// u.emial  ← ERRO: Property 'emial' does not exist
//              Did you mean 'email'?`,
    pontos: [
      "Tipos nos parâmetros impedem valores errados",
      "Tipo de retorno garante consistência",
      "Interfaces nomeiam e documentam a estrutura",
      "Erros de typo são pegos imediatamente",
    ],
  },
  {
    id: 2,
    titulo: "Props de Componentes",
    subtitulo: "TypeScript substitui PropTypes com muito mais poder",
    descricao:
      "Sem tipagem, qualquer valor pode ser passado como prop. A interface define o contrato exato do componente, e o editor avisa se você errar.",
    resultadoJS: {
      resultado: "TypeError, undefined ou NaN na interface",
      problema: "Props erradas só quebram quando o componente renderiza ou quando o usuário clica.",
    },
    codigoJS: `// JavaScript — props sem contrato
function CartaoProduto({
  nome, preco, quantidade, onClick
}) {
  return (
    <div onClick={onClick}>
      <h2>{nome}</h2>
      {/* Quebra se preco não for número */}
      <p>R$ {preco.toFixed(2)}</p>
      <p>Total: R$ {(preco * quantidade).toFixed(2)}</p>
    </div>
  );
}

// Nenhum erro no editor, tudo quebra em runtime:
<CartaoProduto
  nome="Camiseta"
  preco="29.90"    // string, não number!
  quantidade={3}
  onClick={() => {}}
/>

// nome ausente — renderiza "undefined"
<CartaoProduto preco={29.9} quantidade={3} />

// onClick ausente — erro ao clicar
<CartaoProduto nome="Camiseta" preco={29.9} quantidade={3} />`,
    codigoTS: `// TypeScript — contrato explícito com interface
interface CartaoProdutoProps {
  nome: string;
  preco: number;
  quantidade: number;
  onClick: () => void;
  desconto?: number;  // opcional com "?"
}

function CartaoProduto({
  nome, preco, quantidade, onClick, desconto = 0
}: CartaoProdutoProps) {
  const total = preco * quantidade * (1 - desconto);
  return (
    <div onClick={onClick}>
      <h2>{nome}</h2>
      <p>R$ {preco.toFixed(2)}</p>
      <p>Total: R$ {total.toFixed(2)}</p>
    </div>
  );
}

// Uso correto
<CartaoProduto
  nome="Camiseta" preco={29.9}
  quantidade={3} onClick={() => {}}
/>

// ERRO: preco="29.90" → Type 'string' is not assignable to 'number'
// ERRO: sem nome → Property 'nome' is missing but required
// ERRO: sem onClick → Property 'onClick' is missing but required`,
    pontos: [
      "Interface documenta todas as props do componente",
      "Props opcionais com '?' são claramente identificadas",
      "VS Code autocompleta as props disponíveis",
      "Erros aparecem na hora de escrever, não na hora de rodar",
    ],
  },
  {
    id: 3,
    titulo: "useState Tipado",
    subtitulo: "TypeScript obriga você a tratar null e undefined",
    descricao:
      "Um dos bugs mais comuns em React é acessar propriedades de estado que ainda não foi carregado. TypeScript torna isso impossível de ignorar.",
    resultadoJS: {
      resultado: "TypeError ou estado incoerente",
      problema: "O acesso a null e a troca de number para string passam pelo editor.",
    },
    codigoJS: `// JavaScript — null safety ignorado
function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    fetch("/api/usuario/1")
      .then(res => res.json())
      .then(setUsuario);
  }, []);

  // Sem erro no editor!
  // Mas quebra se usuario ainda for null:
  return (
    <div>
      {/* TypeError: Cannot read
          properties of null */}
      <h1>{usuario.nome}</h1>
      <p>{usuario.email}</p>
      {/* Dois níveis de null — JS não avisa! */}
      <img src={usuario.avatar.url} />
    </div>
  );
}

function Contador() {
  const [count, setCount] = useState(0);
  // JS aceita string em estado numérico
  const inc = () => setCount(count + "1");
  // resultado: "01", "011", "0111"...
  return <button onClick={inc}>{count}</button>;
}`,
    codigoTS: `// TypeScript — null safety obrigatório
interface Usuario {
  id: number;
  nome: string;
  email: string;
  avatar?: { url: string; alt: string }; // opcional!
}

function PerfilUsuario() {
  // TypeScript sabe que pode ser null
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    fetch("/api/usuario/1")
      .then(res => res.json())
      .then((dados: Usuario) => setUsuario(dados));
  }, []);

  // usuario.nome ← ERRO: Object is possibly 'null'
  // TypeScript OBRIGA você a tratar o null!

  if (!usuario) return <p>Carregando...</p>;

  // Aqui TypeScript sabe que não é null
  return (
    <div>
      <h1>{usuario.nome}</h1>
      <p>{usuario.email}</p>
      {/* avatar é opcional — verificação necessária */}
      {usuario.avatar && (
        <img src={usuario.avatar.url} alt={usuario.avatar.alt} />
      )}
    </div>
  );
}`,
    pontos: [
      "useState<Tipo> define o tipo do estado explicitamente",
      "Union type (Usuario | null) força tratamento do null",
      "TypeScript não deixa acessar propriedades antes de verificar",
      "Propriedades opcionais com '?' precisam de verificação",
    ],
  },
  {
    id: 4,
    titulo: "Interfaces e API",
    subtitulo: "Tipagem de respostas HTTP elimina erros de campo",
    descricao:
      "Ao buscar dados de uma API, sem tipos você não sabe se o campo existe, qual o nome exato, ou qual o tipo do valor. Interfaces resolvem isso.",
    resultadoJS: {
      resultado: "Tela em branco ou dados undefined",
      problema: "Campos com typo e formatos inesperados só aparecem depois da resposta da API.",
    },
    codigoJS: `// JavaScript — API sem tipagem
async function carregarProdutos() {
  const res = await fetch("/api/produtos");
  const dados = await res.json();
  // dados é "any" — qualquer acesso é permitido!

  return dados.itens.map(p => ({
    // Nenhum aviso para:
    nome: p.nme,           // typo — retorna undefined
    preco: p.price,        // campo em inglês errado
    disponivel: p.em_estoque, // camelCase ou snake?
    foto: p.imagens[0].src,   // e se imagens for vazio?
    categoria: p.cat.nome,    // e se cat for null?
  }));
}

// Só descobrimos os erros quando o app abre
// e a tela aparece em branco (ou pior, em produção!)`,
    codigoTS: `// TypeScript — interface define o contrato da API
interface Imagem {
  src: string;
  alt: string;
}

interface Produto {
  id: number;
  nome: string;           // não "nme"
  preco: number;          // não "price"
  emEstoque: boolean;     // não "em_estoque"
  imagens: Imagem[];
  categoria: { nome: string } | null;
}

interface RespostaAPI {
  produtos: Produto[];    // não "itens"!
  total: number;
}

async function carregarProdutos(): Promise<Produto[]> {
  const res = await fetch("/api/produtos");
  const dados: RespostaAPI = await res.json();

  // p.nme      ← ERRO: Property 'nme' does not exist
  //                  Did you mean 'nome'?
  // p.price    ← ERRO: Property 'price' does not exist
  // p.em_estoque ← ERRO: Did you mean 'emEstoque'?

  return dados.produtos.map(p => ({
    ...p,
    // acesso seguro com verificações
    foto: p.imagens[0]?.src ?? "/placeholder.png",
    categoria: p.categoria?.nome ?? "Sem categoria",
  }));
}`,
    pontos: [
      "Interface descreve exatamente o shape da resposta da API",
      "Typos em nomes de campos são pegos imediatamente",
      "Promise<Tipo> tipifica o retorno de funções async",
      "VS Code autocompleta campos disponíveis no objeto",
    ],
  },
  {
    id: 5,
    titulo: "Generics",
    subtitulo: "Componentes e funções reutilizáveis com segurança de tipos",
    descricao:
      "Generics permitem criar componentes e funções que funcionam com qualquer tipo, mas ainda mantêm a segurança de tipos em cada uso específico.",
    resultadoJS: {
      resultado: "Typos em callbacks e retorno any",
      problema: "A lógica reutilizável perde o tipo do item e deixa chamadas inválidas parecerem corretas.",
    },
    codigoJS: `// JavaScript — sem generics
// Precisa duplicar código ou perder tipagem

// Componente de lista genérico — sem tipos
function ListaGenerica({ itens, renderItem }) {
  return (
    <ul>
      {itens.map((item, i) => (
        <li key={i}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// JS não sabe o tipo de "item" em renderItem
// Sem autocompletar, sem validação
<ListaGenerica
  itens={usuarios}
  renderItem={u => u.nme}  // typo — JS ignora
/>

// Função utilitária — retorna "any"
function primeiroItem(array) {
  return array[0];
  // retorno é "any" — perde informação de tipo
}
const nome = primeiroItem(["Ana", "Bruno"]);
// nome.toUpperCase() — funciona, mas...
// nome.toFixed(2)    — também "funciona" no editor!`,
    codigoTS: `// TypeScript — Generics mantêm tipo em funções reutilizáveis
interface ListaProps<T> {
  itens: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function Lista<T>({
  itens, renderItem, keyExtractor
}: ListaProps<T>) {
  return (
    <ul>
      {itens.map(item => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

// TypeScript infere T = Usuario automaticamente
<Lista
  itens={usuarios}
  keyExtractor={u => String(u.id)}
  renderItem={u => u.nome}  // u tem tipo Usuario!
  // u.nme ← ERRO: Property 'nme' does not exist
/>

// Função genérica — retorno tem o tipo correto!
function primeiroItem<T>(array: T[]): T | undefined {
  return array[0];
}
const nome = primeiroItem(["Ana", "Bruno"]); // string | undefined
// nome?.toUpperCase()  ← sugerido pelo editor
// nome?.toFixed(2)     ← ERRO: Property 'toFixed' does
//                          not exist on type 'string'`,
    pontos: [
      "Generics (<T>) permitem reutilizar lógica sem perder tipos",
      "TypeScript infere o tipo T automaticamente pelo uso",
      "Componentes genéricos funcionam com qualquer tipo de dado",
      "O retorno de funções genéricas tem o tipo correto",
    ],
  },
  {
    id: 6,
    titulo: "Eventos e Formulários",
    subtitulo: "TypeScript conhece os eventos nativos do navegador",
    descricao:
      "Um problema comum no React é descobrir o tipo correto de cada evento. Com TypeScript, o editor sabe se você está lidando com input, form, button ou qualquer outro elemento do DOM.",
    resultadoJS: {
      resultado: "TypeError: event.targt is undefined",
      problema: "O editor não sabe que o evento veio de um input e deixa typos no DOM passarem.",
    },
    codigoJS: `// JavaScript — evento sem contrato claro
function LoginForm() {
  function handleSubmit(event) {
    event.preventDefault();

    // Qual é o tipo de event.target?
    // O editor não sabe garantir.
    const email = event.target.email.value;
    const senha = event.target.senha.value;

    enviarLogin(email, senha);
  }

  function handleEmailChange(event) {
    // Typo passa sem aviso no editor
    console.log(event.targt.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" onChange={handleEmailChange} />
      <input name="senha" type="password" />
      <button>Entrar</button>
    </form>
  );
}`,
    codigoTS: `// TypeScript — eventos tipados pelo React e pelo DOM
import type { ChangeEvent, FormEvent } from "react";

interface LoginFormElement extends HTMLFormElement {
  elements: HTMLFormControlsCollection & {
    email: HTMLInputElement;
    senha: HTMLInputElement;
  };
}

function LoginForm() {
  function handleSubmit(event: FormEvent<LoginFormElement>) {
    event.preventDefault();

    const email = event.currentTarget.elements.email.value;
    const senha = event.currentTarget.elements.senha.value;

    enviarLogin(email, senha);
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.currentTarget.value);
    // event.currentTarget.valu
    // ERRO: Property 'valu' does not exist
  }
}`,
    pontos: [
      "FormEvent tipa eventos de formulário",
      "ChangeEvent<HTMLInputElement> tipa inputs",
      "currentTarget evita confusão com target",
      "Typos em propriedades do DOM aparecem enquanto você digita",
    ],
  },
  {
    id: 7,
    titulo: "Produtividade Real",
    subtitulo: "TypeScript ajuda mais do que atrasa",
    descricao:
      "A sensação inicial pode ser de escrever mais. Na prática, o VS Code devolve esse tempo com autocomplete, navegação, refatoração e erros encontrados antes de abrir o navegador.",
    resultadoJS: {
      resultado: "Erro descoberto em teste manual",
      problema: "Renomear campos ou mudar contratos não avisa todos os pontos afetados.",
    },
    codigoJS: `// JavaScript — produtividade depende da memória
function salvarUsuario(usuario) {
  return api.post("/usuarios", {
    name: usuario.nome,
    email: usuario.email,
    active: usuario.ativo,
  });
}

// Sem contrato, você precisa lembrar:
// usuario tem "nome" ou "name"?
// ativo é boolean ou string?
// api.post retorna o quê?

const usuario = buscarUsuario();
salvarUsuario(usuario);

// Se alguém renomear "nome" para "nomeCompleto",
// o erro só aparece em runtime ou em teste manual.`,
    codigoTS: `// TypeScript — o editor participa do trabalho
interface Usuario {
  id: number;
  nome: string;
  email: string;
  ativo: boolean;
}

async function salvarUsuario(usuario: Usuario) {
  return api.post("/usuarios", {
    name: usuario.nome,
    email: usuario.email,
    active: usuario.ativo,
  });
}

const usuario = await buscarUsuario();
salvarUsuario(usuario);

// Ganhos práticos:
// - autocomplete nos campos de Usuario
// - Ctrl/Cmd + clique para navegar até a interface
// - renomear propriedade com segurança
// - erro no editor antes do refresh`,
    pontos: [
      "Autocomplete reduz consulta mental e documentação repetida",
      "Erros aparecem durante a escrita",
      "Refatorações ficam mais confiáveis",
      "A velocidade vem da ferramenta trabalhando junto",
    ],
  },
  {
    id: 8,
    titulo: "O Mundo Além do React",
    subtitulo: "O ecossistema JavaScript aprendeu a falar TypeScript",
    descricao:
      "TypeScript não serve só para componentes React. Bibliotecas modernas já publicam seus próprios tipos, e bibliotecas antigas muitas vezes recebem tipos pela comunidade no DefinitelyTyped.",
    resultadoJS: {
      resultado: "buscar.cancelar is not a function",
      problema: "Sem tipos da biblioteca, métodos inexistentes parecem aceitáveis até o runtime.",
    },
    codigoJS: `// JavaScript — biblioteca externa sem tipos
import debounce from "lodash/debounce";

const buscar = debounce((termo) => {
  return fetch("/api/busca?q=" + termo);
}, 300);

buscar("react");

// O editor não garante:
// - quais argumentos debounce aceita
// - qual função volta
// - se você chamou com parâmetros corretos

buscar.cancelar(); // typo passa batido no editor`,
    codigoTS: `// TypeScript — tipos vêm do pacote ou da comunidade
import debounce from "lodash/debounce";

const buscar = debounce((termo: string) => {
  return fetch("/api/busca?q=" + termo);
}, 300);

buscar("react");
buscar.cancel();

// Bibliotecas modernas geralmente já incluem tipos:
// React, Next.js, Zod, TanStack Query, Prisma...

// Bibliotecas antigas podem usar DefinitelyTyped:
// npm install -D @types/lodash

// buscar.cancelar()
// ERRO: Property 'cancelar' does not exist`,
    pontos: [
      "DefinitelyTyped mantém tipos para muitas bibliotecas antigas",
      "Pacotes modernos costumam nascer com TypeScript",
      "O ganho aparece em APIs, validação, banco, testes e tooling",
      "Tipos viram documentação viva dentro do editor",
    ],
  },
  {
    id: 9,
    titulo: "Nem tudo são flores",
    subtitulo: "TypeScript tem custo de aprendizado e configuração",
    descricao:
      "A parte honesta: no começo, configurar o projeto e entender mensagens grandes pode cansar. O ponto é tratar isso como investimento, não como burocracia sem retorno.",
    resultadoJS: {
      resultado: "TypeError ao chamar trim em null",
      problema: "O caminho rápido adia a validação para o momento em que o usuário executa o fluxo.",
    },
    codigoJS: `// JavaScript — começo rápido, custo adiado
function normalizarProduto(produto) {
  return {
    id: produto.id,
    nome: produto.name.trim(),
    preco: Number(produto.price),
  };
}

// Parece simples...
normalizarProduto({ id: 1, name: null, price: "29.9" });

// Mas o erro aparece tarde:
// TypeError: Cannot read properties of null

// Sem tipos, a configuração inicial é menor,
// mas parte da validação fica espalhada em runtime.`,
    codigoTS: `// TypeScript — mais rigor no começo
interface ProdutoAPI {
  id: number;
  name: string | null;
  price: string;
}

function normalizarProduto(produto: ProdutoAPI) {
  return {
    id: produto.id,
    // produto.name.trim()
    // ERRO: 'produto.name' is possibly 'null'
    nome: produto.name?.trim() ?? "Sem nome",
    preco: Number(produto.price),
  };
}

// Custos reais:
// - escolher strict ou migração gradual
// - entender erros com generics
// - tipar bordas como APIs e bibliotecas
// - resistir à tentação de usar any`,
    pontos: [
      "Configuração inicial pode assustar",
      "Mensagens de erro às vezes são longas",
      "O time precisa combinar padrões",
      "O custo inicial compra confiança para crescer o projeto",
    ],
  },
  {
    id: 10,
    titulo: "Dicas Práticas",
    subtitulo: "Como começar sem transformar TypeScript em sofrimento",
    descricao:
      "A melhor forma de usar TypeScript é deixar ele ajudar sem tentar tipar tudo manualmente. Comece pelas bordas do sistema, evite any e migre aos poucos.",
    resultadoJS: {
      resultado: "any esconde todos os problemas",
      problema: "O código compila, mas typos e valores inválidos voltam a passar como em JavaScript puro.",
    },
    codigoJS: `// Antipadrões comuns ao começar
let usuario: any = await resposta.json();

console.log(usuario.nme.toUpperCase());
// any desligou o TypeScript:
// typo em "nme" não aparece
// null não aparece
// tipo errado não aparece

function formatar(valor: any): any {
  return valor.toFixed(2);
}

formatar("29.9");
// O código compila, mas quebra em runtime.`,
    codigoTS: `// Dicas práticas para usar bem
interface Usuario {
  id: number;
  nome: string;
  email: string;
}

// 1. Deixe o TS inferir quando estiver óbvio
const total = 10 * 2; // number

// 2. Tipar entradas e saídas importantes
async function carregarUsuario(id: number): Promise<Usuario> {
  const resposta = await fetch("/api/usuarios/" + id);
  return resposta.json();
}

// 3. Prefira unknown quando ainda não sabe o tipo
function tratarErro(erro: unknown) {
  if (erro instanceof Error) return erro.message;
  return "Erro desconhecido";
}

// 4. Migre aos poucos: arquivo por arquivo, borda por borda`,
    pontos: [
      "Não use any como solução padrão",
      "Deixe o TypeScript inferir tipos simples",
      "Tipar APIs, props e retornos dá muito retorno",
      "Migração gradual é melhor do que reescrever tudo",
    ],
  },
  {
    id: 11,
    titulo: "Conclusão e Q&A",
    subtitulo: "Menos bugs, mais confiança e mais clareza para o time",
    descricao:
      "TypeScript não elimina todos os problemas, mas muda onde muitos deles aparecem: em vez de descobrir no navegador ou em produção, você descobre enquanto escreve.",
    resultadoJS: {
      resultado: "Bug aparece tarde",
      problema: "Sem contratos, a confiança depende de memória, teste manual e disciplina.",
    },
    codigoJS: `// Sem TypeScript, muita coisa depende de disciplina
const projeto = {
  bugs: "aparecem tarde",
  refatoracao: "depende de teste manual",
  onboarding: "depende de explicação verbal",
  confianca: "cai quando o app cresce",
};

// JavaScript continua poderoso,
// mas projetos grandes precisam de contratos claros.`,
    codigoTS: `// Com TypeScript, contratos ficam no código
type Beneficio =
  | "menos bugs em runtime"
  | "mais autocomplete"
  | "refatoração mais segura"
  | "documentação viva";

const conclusao: Beneficio[] = [
  "menos bugs em runtime",
  "mais autocomplete",
  "refatoração mais segura",
  "documentação viva",
];

// Ideia principal:
// TypeScript aumenta a confiança para mudar código.

// Q&A: perguntas, dúvidas e casos reais do time.`,
    pontos: [
      "TypeScript antecipa erros",
      "O editor vira parte ativa do desenvolvimento",
      "O ecossistema já está preparado",
      "Perguntas e discussão ajudam a conectar com a prática",
    ],
  },
];
