interface SlideIntroProps {
  onComecar: () => void;
}

export function SlideIntro({ onComecar }: SlideIntroProps) {
  return (
    <div className="intro">
      <div className="intro-content">
        <div className="intro-logos">
          <span className="logo-js">JS</span>
          <span className="intro-seta">→</span>
          <span className="logo-ts">TS</span>
        </div>

        <h1 className="intro-titulo">
          React + <span className="destaque-ts">TypeScript</span>
        </h1>

        <p className="intro-subtitulo">
          Como o TypeScript resolve os problemas do JavaScript em projetos React
        </p>

        <div className="intro-topicos">
          <div className="topico">
            <span className="topico-num">01</span>
            <span>Funções e Tipos Básicos</span>
          </div>
          <div className="topico">
            <span className="topico-num">02</span>
            <span>Props de Componentes</span>
          </div>
          <div className="topico">
            <span className="topico-num">03</span>
            <span>useState Tipado</span>
          </div>
          <div className="topico">
            <span className="topico-num">04</span>
            <span>Interfaces e Respostas de API</span>
          </div>
          <div className="topico">
            <span className="topico-num">05</span>
            <span>Generics</span>
          </div>
        </div>

        <button className="btn-comecar" onClick={onComecar}>
          Começar apresentação →
        </button>
      </div>

      <div className="intro-info">
        <div className="info-card info-card--js">
          <h3>JavaScript</h3>
          <ul>
            <li>Tipagem dinâmica</li>
            <li>Erros em runtime</li>
            <li>Sem autocompletar preciso</li>
            <li>Refatoração arriscada</li>
          </ul>
        </div>
        <div className="info-vs">VS</div>
        <div className="info-card info-card--ts">
          <h3>TypeScript</h3>
          <ul>
            <li>Tipagem estática</li>
            <li>Erros em desenvolvimento</li>
            <li>Autocompletar inteligente</li>
            <li>Refatoração segura</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
