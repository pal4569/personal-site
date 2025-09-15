import './CreateRaw.css'

interface CreateRawProps {
  setLines: React.Dispatch<React.SetStateAction<string[]>>;
  setHighlightTop: React.Dispatch<React.SetStateAction<string>>;
}

export default function CreateRaw({ setLines, setHighlightTop }: CreateRawProps) {
  function moveHighlight(event: React.MouseEvent<HTMLDivElement>) {
    const offset = 30;
    const editorTop = event.currentTarget.getBoundingClientRect().top;
    const relativeY = event.clientY - editorTop;
    const snapped = Math.floor(relativeY / offset) * offset;
    const y_pos = snapped + "px";
    setHighlightTop(y_pos);
  }
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
            className="create-field"
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            onClick={moveHighlight}/>
    </>
    )
}