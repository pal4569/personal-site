import { useEffect, useState } from "react";
import "./BlogEditor.css";
import CreateOptions from "../../components/CreateOptions/CreateOptions";
import CreatePreview from "../../components/CreatePreview/CreatePreview";
import CreateHighlight from "../../components/CreateHighlight/CreateHighlight";
import CreateRaw from "../../components/CreateRaw/CreateRaw";
import { useParams } from "react-router-dom";

type Blog = {
  id: number;
  author: string;
  title: string;
  content: string;
  created_at: string; 
};

export default function PostEditor() {
  const [lines, setLines] = useState<string[]>([]);
  const [title] = useState<string>("Untitled");
  const [highlightTop, setHighlightTop] = useState("300px");
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch blog: ${res.statusText}`);
        }
        const data: Blog = await res.json();
        if (data) {
          setLines(data.content.split("\n"));
        }
        console.log(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      }
    };

    if (id) {
      fetchBlog();
    }

  }, []);


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
        title={title}/>
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
function setError(message: string) {
  if (message) {
    throw new Error(message);
  }
  else {
    throw new Error("Function not implemented.");
  }
}

