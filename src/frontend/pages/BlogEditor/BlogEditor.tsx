import { useEffect, useState } from "react";
import "./BlogEditor.css";
import CreateOptions from "../../components/CreateOptions/CreateOptions";
import CreatePreview from "../../components/CreatePreview/CreatePreview";
import CreateHighlight from "../../components/CreateHighlight/CreateHighlight";
import CreateRaw from "../../components/CreateRaw/CreateRaw";
import { useParams } from "react-router-dom";
import { usePromptOnUnsaved } from "../../hooks/usePromptOnUnsaved";

type Blog = {
  id: number;
  author: string;
  title: string;
  content: string;
  created_at: string; 
};

export default function PostEditor() {
  const [lines, setLines] = useState<string[]>([""]);
  const [save, setSave] = useState<string[]>([""]);
  const [saveState, setsaveState] = useState<boolean>(true);
  const isUnsaved = JSON.stringify(lines) !== JSON.stringify(save);
  const [title] = useState<string>("Untitled");
  const [highlightTop, setHighlightTop] = useState("300px");
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchBlog() {
      try { 
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (!res.ok) throw new Error(`Failed to fetch blog: ${res.statusText}`);

        const data: Blog = await res.json();
        const loadedLines = data.content.split("\n");

        setLines(loadedLines);
        console.log("setLines called with", loadedLines);
        setSave(loadedLines);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    }

    if (id) {
       fetchBlog();
    }
    else {
      setLines([""])
      setSave(lines);
    }
  }, [id]);

  const ignorePromptRef = usePromptOnUnsaved(isUnsaved);

  return (
    <div className="pageContainer">
      <h1
        className="postTitle"
        contentEditable
        suppressContentEditableWarning
      >
        {title}
      </h1>

      <CreateOptions 
        blog_content={lines} 
        title={title}
        saveState={saveState}
        ignorePromptRef={ignorePromptRef}/>
      <div className="editorContainer">
        <div className="rawContainer">
          <CreateRaw 
            lines={lines}
            setLines={setLines}
            setHighlightTop={setHighlightTop} 
            save={save}
            setSaveState={setsaveState}
          />
          <CreateHighlight highlightTop={highlightTop} />
        </div>
        <CreatePreview lines={lines} />
      </div>
    </div>
  );
}
