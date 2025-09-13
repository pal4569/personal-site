import { useEffect, useState } from "react";
import './CreateOptions.css';

export default function CreateOptions({
  blog_content,
  title
}: {
  blog_content: string[];
  title: string;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [savedState, setSavedState] = useState<string[]>([]);
  const [saveDisable, setSaveDisable] = useState<boolean>(true);

  // Watch for changes in blog_content to enable/disable Save button
  useEffect(() => {
    const isSame =
      JSON.stringify(savedState) === JSON.stringify(blog_content);
    setSaveDisable(isSame);
  }, [blog_content, savedState]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    }
  }

  async function handleSave() {
    setSavedState(blog_content);

    await fetch("http://localhost:5000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: "Michael",
        title: title,
        content: blog_content.join("\n"),
      })
    });
  }

  return (
    <div className="create-options">
      <button
        className="option"
        onClick={handleSave}
        disabled={saveDisable}
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
  );
}
