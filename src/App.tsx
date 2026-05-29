"use client";

import { useState, useEffect } from "react";
import { slides } from "./data/slides";
import { SlideIntro } from "./slides/SlideIntro";
import { SlideLayout } from "./components/SlideLayout";

function App() {
  const [slideAtual, setSlideAtual] = useState(0); // 0 = intro

  const irPara = (indice: number) => {
    setSlideAtual(Math.max(0, Math.min(indice, slides.length)));
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;

      if (isTyping) return;

      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        setSlideAtual((atual) => Math.min(atual + 1, slides.length));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setSlideAtual((atual) => Math.max(atual - 1, 0));
      } else if (e.key === "Home") {
        e.preventDefault();
        setSlideAtual(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setSlideAtual(slides.length);
      }
    };

    document.addEventListener("keydown", handleKey, true);
    return () => document.removeEventListener("keydown", handleKey, true);
  }, []);

  const slide = slides[slideAtual - 1];

  return (
    <div className="app">
      <nav className="topbar">
        <div className="topbar-brand">
          <span className="topbar-logo-js">JS</span>
          <span className="topbar-seta">→</span>
          <span className="topbar-logo-ts">TS</span>
          <span className="topbar-titulo">React + TypeScript</span>
        </div>
        <div className="topbar-slides">
          {[0, ...slides.map((_, i) => i + 1)].map((i) => (
            <button
              key={i}
              className={`topbar-dot ${slideAtual === i ? "topbar-dot--ativo" : ""}`}
              onClick={() => setSlideAtual(i)}
              title={i === 0 ? "Introdução" : slides[i - 1].titulo}
              aria-label={i === 0 ? "Ir para introdução" : `Ir para slide ${i}`}
            />
          ))}
        </div>
        <div className="topbar-dica">← → para navegar</div>
      </nav>

      <main className="main">
        {slideAtual === 0 ? (
          <SlideIntro onComecar={() => setSlideAtual(1)} />
        ) : (
          <SlideLayout
            slide={slide}
            total={slides.length}
            onAnterior={() => irPara(slideAtual - 1)}
            onProximo={() => irPara(slideAtual + 1)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
