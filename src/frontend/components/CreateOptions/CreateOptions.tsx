import { useState } from "react";
import './CreateOptions.css';

export default function CreateOptions({
  blog_content,
  title
}: {
  blog_content: string[];
  title: string;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    }
    console.log(blog_content);
  }

  async function handleSave() {

    await fetch("http://localhost:5000/api/blogs/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: "Michael",
        title: title,
        content: blog_content,
      })
    });
  }

  return (
    <div className="create-options">
      <button
        className="option"
        onClick={handleSave}
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
