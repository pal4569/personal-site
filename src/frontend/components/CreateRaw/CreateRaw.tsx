import { useEffect, useRef } from 'react';
import './CreateRaw.css'

interface CreateRawProps {
  setLines: React.Dispatch<React.SetStateAction<string[]>>;
  setHighlightTop: React.Dispatch<React.SetStateAction<string>>;
  lines: string[];
}

export default function CreateRaw({ setLines, setHighlightTop, lines }: CreateRawProps) {
  const divRef = useRef<HTMLDivElement>(null);
  
  function moveHighlight(event: React.MouseEvent<HTMLDivElement>) {
    const offset = 30;
    const editorTop = event.currentTarget.getBoundingClientRect().top;
    const relativeY = event.clientY - editorTop;
    const snapped = Math.floor(relativeY / offset) * offset;
    const y_pos = snapped + "px";
    setHighlightTop(y_pos);
  }

  useEffect(() => {
    if (divRef.current) {
      const newText = lines.join("\n");
      if (divRef.current.innerText !== newText) {
        divRef.current.innerText = newText;
      }
    }
  }, [lines]);


  function handleInput(event: React.FormEvent<HTMLDivElement>) {
    const el = event.currentTarget;

    let textLines = el.innerText.split("\n");

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
    <>
        <div
            ref={divRef}
            className="create-field"
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            onClick={moveHighlight}/>
    </>
    )
}