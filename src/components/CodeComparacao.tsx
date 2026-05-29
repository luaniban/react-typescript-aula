import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeComparacaoProps {
  codigoJS: string;
  codigoTS: string;
}

export function CodeComparacao({ codigoJS, codigoTS }: CodeComparacaoProps) {
  return (
    <div className="code-comparacao">
      <div className="code-coluna code-coluna--js">
        <div className="code-header code-header--js">
          <span className="code-badge code-badge--js">JS</span>
          <span>JavaScript — o problema</span>
          <span className="code-icone">Problema</span>
        </div>
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: "0 0 8px 8px",
            fontSize: "0.78rem",
            lineHeight: "1.6",
            padding: "1.25rem",
            background: "#1a0a0a",
            flex: 1,
          }}
          showLineNumbers
          lineNumberStyle={{ color: "#555", minWidth: "2rem" }}
        >
          {codigoJS}
        </SyntaxHighlighter>
      </div>

      <div className="code-coluna code-coluna--ts">
        <div className="code-header code-header--ts">
          <span className="code-badge code-badge--ts">TS</span>
          <span>TypeScript — a solução</span>
          <span className="code-icone">Solucao</span>
        </div>
        <SyntaxHighlighter
          language="typescript"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: "0 0 8px 8px",
            fontSize: "0.78rem",
            lineHeight: "1.6",
            padding: "1.25rem",
            background: "#0a1a0a",
            flex: 1,
          }}
          showLineNumbers
          lineNumberStyle={{ color: "#555", minWidth: "2rem" }}
        >
          {codigoTS}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
