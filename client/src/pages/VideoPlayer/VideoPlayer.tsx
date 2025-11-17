import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './VideoPlayer.css';

type Video = {
  id: number;
  title: string;
  link: string;
  description: string; 
};

const API = import.meta.env.VITE_SERVER_URL;

export default function VideoPlayer() {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchVideo = async () => {
      try {
        const res = await fetch(`${API}/api/videos/${id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch video: ${res.statusText}`);
        }
        const data: Video = await res.json();
        setVideo(data);
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

    fetchVideo();
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!video) return <p>No video found.</p>;
    return (
        <div className="video-page-container">
            <div className="video-title">{video.title}</div>
            <iframe
                src={video.link}
                allowFullScreen
            />
            <div className="description">{video.description}</div>
        </div>
    )
}