import { useState, type RefObject } from "react";
import './CreateOptions.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useSidebar } from "../SideBar/SideBarContent/useSidebar";

export default function CreateOptions({
  blog_content,
  title,
  saveState,
  ignorePromptRef,
  setIgnorePrompt,
}: {
  blog_content: string[];
  title: string;
  saveState: boolean;
  ignorePromptRef: RefObject<boolean>;
  setIgnorePrompt: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { reload } = useSidebar();
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    }
  }

  async function handleSave() {
    try {
      setIgnorePrompt(true);
      ignorePromptRef.current = true;
      const isEditing = window.location.pathname.startsWith("/blogs/edit/");

      const url = isEditing
        ? `http://localhost:5000/api/blogs/${id}`
        : `http://localhost:5000/api/blogs/new`;

      const method = isEditing ? "PUT" : "POST"
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: "Michael",
          title: title,
          content: blog_content,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditing ? "update" : "create"} blog`);
      }

      const data = await response.json();
      const new_link = data.link;

      reload();
      await new Promise((r) => setTimeout(r, 10));
      navigate(new_link);
      setLastSaved(data.blog.edited_at);
    } finally {
      setTimeout(() => {
        if (ignorePromptRef.current) ignorePromptRef.current = false;
      }, 1000);
    }
  }


  return (
    <div className="create-options-page-container">
      <div className="create-options">
        <button
          className="option"
          onClick={handleSave}
          disabled={saveState}
        >
          Save
        </button>

        <label htmlFor="file-upload" className="option">
          Upload Image
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleChange}
          style={{ display: "none" }}
        />

        {selectedImage && <img src={selectedImage} alt="Uploaded preview" />}
      </div>
      <div className="last-saved">
        {lastSaved && `Saved at ${new Date(lastSaved).toLocaleString()}`}
      </div>
    </div>
  );
}
