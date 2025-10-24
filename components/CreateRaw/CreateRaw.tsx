import { useEffect, useRef } from "react";
import "./CreateRaw.css";

interface CreateRawProps {
  lines: string[];
  setLines: React.Dispatch<React.SetStateAction<string[]>>;
  setHighlightTop: React.Dispatch<React.SetStateAction<string>>;
  save: string[];
  setSaveState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateRaw({
  lines,
  setLines,
  setHighlightTop,
  save,
  setSaveState,
}: CreateRawProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isUserTyping = useRef(false);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;

    const newText = lines.join("\n");
    if (!isUserTyping.current && el.innerText !== newText) {
      el.innerText = newText;
    }
  }, [lines]);

  function moveHighlight(event: React.MouseEvent<HTMLDivElement>) {
    const offset = 30;
    const editorTop = event.currentTarget.getBoundingClientRect().top;
    const relativeY = event.clientY - editorTop;
    const snapped = Math.floor(relativeY / offset) * offset;
    setHighlightTop(`${snapped}px`);
  }

  function handleInput(event: React.FormEvent<HTMLDivElement>) {
    const el = event.currentTarget;
    isUserTyping.current = true;

    let textLines = el.innerText.split("\n");

    let emptyCount = 0;
    textLines = textLines.filter((line) => {
      if (line === "") {
        emptyCount++;
        return emptyCount % 2 === 1;
      }
      return true;
    });

    setSaveState(JSON.stringify(textLines) === JSON.stringify(save));
    setLines(textLines);

    setTimeout(() => {
      isUserTyping.current = false;
    }, 200);
  }

  return (
    <div
      ref={editorRef}
      className="create-field"
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onClick={moveHighlight}
    />
  );
}
