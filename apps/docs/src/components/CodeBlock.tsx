import { codeToTokens } from "shiki";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  lang?: string;
  title?: string;
}

export async function CodeBlock({ code, lang = "tsx", title }: CodeBlockProps) {
  const { tokens, bg, fg } = await codeToTokens(code.trim(), {
    lang: lang as "tsx" | "ts" | "bash" | "json" | "css" | "html",
    theme: "github-dark",
  });

  return (
    <div className="relative rounded-lg border overflow-hidden" style={{ background: bg }}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
          <span className="text-xs font-mono" style={{ color: fg, opacity: 0.5 }}>
            {title}
          </span>
          <CopyButton text={code.trim()} />
        </div>
      )}
      {!title && (
        <div className="absolute top-3 right-3 z-10">
          <CopyButton text={code.trim()} />
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm m-0" style={{ background: bg, color: fg }}>
        <code>
          {tokens.map((line, lineIdx) => (
            <span key={lineIdx} className="block">
              {line.map((token, tokenIdx) => (
                <span
                  key={tokenIdx}
                  style={{
                    color: token.color,
                    fontStyle: token.fontStyle === 1 ? "italic" : undefined,
                    fontWeight: token.fontStyle === 2 ? "bold" : undefined,
                  }}
                >
                  {token.content}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
