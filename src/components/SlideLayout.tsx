import type { SlideData } from "../data/slides";
import { CodeComparacao } from "./CodeComparacao";

interface SlideLayoutProps {
  slide: SlideData;
  total: number;
  onAnterior: () => void;
  onProximo: () => void;
}

export function SlideLayout({ slide, total, onAnterior, onProximo }: SlideLayoutProps) {
  return (
    <div className="slide">
      <header className="slide-header">
        <div className="slide-titulo-grupo">
          <span className="slide-numero">
            {slide.id} / {total}
          </span>
          <h1 className="slide-titulo">{slide.titulo}</h1>
          <p className="slide-subtitulo">{slide.subtitulo}</p>
        </div>
        <div className="slide-nav">
          <button
            className="btn-nav"
            onClick={onAnterior}
            disabled={slide.id === 1}
            title="Slide anterior (←)"
          >
            ←
          </button>
          <button
            className="btn-nav"
            onClick={onProximo}
            disabled={slide.id === total}
            title="Próximo slide (→)"
          >
            →
          </button>
        </div>
      </header>

      <div className="slide-descricao">
        <p>{slide.descricao}</p>
      </div>

      <div className="js-resultado">
        <div className="js-resultado-resumo">
          <span>Resultado no JavaScript</span>
          <strong>{slide.resultadoJS.resultado}</strong>
        </div>
        <p>{slide.resultadoJS.problema}</p>
      </div>

      <CodeComparacao codigoJS={slide.codigoJS} codigoTS={slide.codigoTS} />

      <footer className="slide-footer">
        <ul className="pontos-lista">
          {slide.pontos.map((ponto, i) => (
            <li key={i} className="ponto-item">
              <span className="ponto-icone">▸</span>
              {ponto}
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
