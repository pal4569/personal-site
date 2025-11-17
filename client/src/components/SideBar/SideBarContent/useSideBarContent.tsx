import { useState, useEffect, useCallback, useMemo } from "react";
import type { ItemProps } from "../../SideBarItem/SidebarItem";

const API = import.meta.env.VITE_SERVER_URL;

type JustIdTitle = {
  id: number;
  title: string;
};

type VideoData = {
  id: number;
  title: string;
};

interface UseSidebarReturn {
  layout: ItemProps[];
  reload: () => void;
}

export function useSideBarContent(): UseSidebarReturn {
  const [blogs, setBlogs] = useState<JustIdTitle[]>([]);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [reloadFlag, setReloadFlag] = useState(0);
  
  const reload = useCallback(() => {
    setReloadFlag((prev) => prev + 1);
    
  }, []);

  useEffect(() => {
    const fetchBlogContent = async () => {
      try {
        const res = await fetch(`${API}/api/blogs`);
        if (!res.ok) {
          throw new Error(`Failed to fetch blogs: ${res.statusText}`);
        }

        const data: JustIdTitle[] = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Loading blogs failed", err);
      }
    };
    fetchBlogContent();
  }, [reloadFlag]);

  useEffect(() => {
    const fetchVideoContent = async () => {
      try {
        const res = await fetch(`${API}/api/videos`);
        if (!res.ok) {
          throw new Error(`Failed to fetch videos: ${res.statusText}`);
        }

        const data: VideoData[] = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("Loading videos failed", err);
      }
    };
    fetchVideoContent();
  }, [reloadFlag]);

  const layout = useMemo<ItemProps[]>(() => [
    {
      type: "file",
      name: "Home",
      navigation: "/",
      level: 1,
    },
    {
      type: "folder",
      name: "Blog",
      level: 1,
      children: [
        {
          type: "file",
          name: "Create",
          navigation: "/blogs/new",
          level: 2,
        },
        {
          type: "folder",
          name: "Blogs",
          level: 2,
          children: blogs.map((blog) => ({
            type: "file",
            name: blog.title,
            navigation: `/blogs/${blog.id}`,
            level: 3,
          })),
        },
      ],
    },
    {
      type: "folder",
      name: "Videos",
      level: 1,
      children: videos.map((videos) => ({
        type: "video",
        name: videos.title,
        navigation: `/videos/${videos.id}`,
        level: 2,
      })),
    },
  ], [videos]);

  return {layout, reload};
}
