import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadOptions } from "../../components/LoadOptions/LoadOptions";
import './LoadBlog.css';

type Blog = {
  id: number;
  author: string;
  title: string;
  content: string;
  created_at: string; 
};

export default function LoadBlog() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  let lines: string[] | null = null;
  if (blog) {
    lines = blog.content.split("\n");
  }

  useEffect(() => {
    if (!id) return; // no id in URL
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch blog: ${res.statusText}`);
        }
        const data: Blog = await res.json();
        setBlog(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!lines || !blog) return <p>No blog found.</p>;

  return (
    <div className="page-container">
      <h1 className="title">{blog.title}</h1>
      <div className="pre-content">
        <h3>By {blog.author}</h3>
        <small>Created: {new Date(blog.created_at).toLocaleString()}</small>
      </div>
      <LoadOptions />
      <div className="load-field">
        {lines.map((line, i) => {
          const match = line.match(/^(#{1,6})\s+(.*)/);

          if (match) {
            const level = match[1].length;
            const text = match[2];
            return (
              <div key={i} className={`header header${level}`}>
                {text}
              </div>
            );
          }

          if (line.trim() === "") {
            return <div key={i} className="empty-line" />;
          }

          return (
            <div key={i} className="paragraph">
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
}
