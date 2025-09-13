import { useState } from "react";
import "./CreatePost.css";
import CreateOptions from "../../components/CreateOptions";

export default function CreatePost() {
  const [lines, setLines] = useState<string[]>([]);

  const [title] = useState<string>("Untitled");
  const [highlightTop, setHighlightTop] = useState("300px");

  function moveHighlight(event: React.MouseEvent<HTMLDivElement>) {
    const offset = 30;
    const editorTop = event.currentTarget.getBoundingClientRect().top;
    const relativeY = event.clientY - editorTop;
    const snapped = Math.floor(relativeY / offset) * offset;
    const y_pos = editorTop + snapped + "px";
    setHighlightTop(y_pos);
  }

  function handleInput(event: React.FormEvent<HTMLDivElement>) {
    const el = event.currentTarget;

    let textLines = el.innerText.split("\n");

    // Remove half the "" elements
    let emptyCount = 0;
    textLines = textLines.filter(line => {
      if (line === "") {
        emptyCount++;
        return emptyCount % 2 === 1;
      }
      return true;
    });

    setLines(textLines);
  }

  return (
    <><div className="pageContainer">
      <h1
        className="title"
        contentEditable
        suppressContentEditableWarning
      >
        {title}
      </h1>
    </div><CreateOptions
        blog_content={lines}
        title={title} /><div className="highlight" style={{ top: highlightTop }} /><div
        className="create-field"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onClick={moveHighlight} /><div className="preview">
        {lines.map((line, i) => {
          const match = line.match(/^(#{1,6})\s+(.*)/);
          if (match) {
            const level = match[1].length;
            const content = match[2];
            return (
              <div key={i} className={`header${level}`}>
                {content}
              </div>
            );
          }
          if (line.trim() === "") {
            return <div key={i} className="i-hate-css-so-much" />;
          }
          return <div key={i}>{line}</div>;
        })}
      </div></>
  );
}
