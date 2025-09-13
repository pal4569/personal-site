import { useState } from "react";
import "./CreatePost.css";
import CreateOptions from "../../components/CreateOptions/CreateOptions";
import CreatePreview from "../../components/CreatePreview/CreatePreview";
import CreateHighlight from "../../components/CreateHighlight/CreateHighlight";
import CreateRaw from "../../components/CreateRaw/CreateRaw";

export default function CreatePost() {
  const [lines, setLines] = useState<string[]>([]);
  const [title] = useState<string>("Untitled");
  const [highlightTop, setHighlightTop] = useState("300px");

  return (
    <div className="pageContainer">
      <h1
        className="title"
        contentEditable
        suppressContentEditableWarning
      >
        {title}
      </h1>

      <CreateOptions blog_content={lines} title={title} />

      <CreateHighlight
        highlightTop={highlightTop}
      />
      <CreateRaw 
        setLines={setLines}
        setHighlightTop={setHighlightTop} />
      <CreatePreview lines={lines} />
    </div>
  );
}
