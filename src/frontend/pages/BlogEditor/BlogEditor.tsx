import { useEffect, useRef, useState } from "react";
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
  const [title, setTitle] = useState<string>("Untitled");
  const [highlightTop, setHighlightTop] = useState("300px");
  const { id } = useParams<{ id: string }>();
  const { ignorePromptRef, setIgnorePrompt } = usePromptOnUnsaved(isUnsaved);

  const titleRef = useRef<HTMLHeadingElement>(null);

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
        setTitle(data.title || "Untitled");
        if (titleRef.current) titleRef.current.textContent = data.title || "Untitled";
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
      if (titleRef.current) titleRef.current.textContent = "Untitled";
    }
  }, [id]);

  return (
    <div className="pageContainer">
      <h1
        ref={titleRef}
        className="postTitle"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => setTitle(e.currentTarget.textContent || "Untitled")}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        data-placeholder="Untitled"
      />

      <CreateOptions 
        blog_content={lines} 
        title={title}
        saveState={saveState}
        ignorePromptRef={ignorePromptRef}
        setIgnorePrompt={setIgnorePrompt}/>
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
