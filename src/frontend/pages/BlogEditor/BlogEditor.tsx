import { useState } from "react";
import "./BlogEditor.css";
import CreateOptions from "../../components/CreateOptions/CreateOptions";
import CreatePreview from "../../components/CreatePreview/CreatePreview";
import CreateHighlight from "../../components/CreateHighlight/CreateHighlight";
import CreateRaw from "../../components/CreateRaw/CreateRaw";

export default function PostEditor() {
  const [lines, setLines] = useState<string[]>([]);
  const [title] = useState<string>("Untitled");
  const [highlightTop, setHighlightTop] = useState("300px");

  return (
    <div className="pageContainer">
      <h1
        className="postTitle"
        contentEditable
        suppressContentEditableWarning
      >
        {title}
      </h1>

      <CreateOptions blog_content={lines} title={title} />

      <div className="editorContainer">
        <div className="rawContainer">
          <CreateRaw 
            setLines={setLines}
            setHighlightTop={setHighlightTop} 
          />
          <CreateHighlight highlightTop={highlightTop} />
        </div>
        <CreatePreview lines={lines} />
      </div>
    </div>
  );
}
