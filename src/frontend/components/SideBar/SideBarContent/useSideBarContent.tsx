import { useState, useEffect, useCallback } from "react";
import type { ItemProps } from "../../SideBarItem/SidebarItem";

type JustIdTitle = {
  id: number;
  title: string;
};

interface UseSidebarReturn {
  layout: ItemProps[];
  reload: () => void;
}

export function useSideBarContent(): UseSidebarReturn {
  const [blogs, setBlogs] = useState<JustIdTitle[]>([]);
  const [reloadFlag, setReloadFlag] = useState(0);
  
  const reload = useCallback(() => {
    setReloadFlag((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const fetchBlogContent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs`);
        if (!res.ok) {
          throw new Error(`Failed to fetch blogs: ${res.statusText}`);
        }

        const data: JustIdTitle[] = await res.json();
        console.log("Fetched data (reloadFlag =", reloadFlag, "):", data);
        setBlogs(data);
      } catch (err) {
        console.error("Loading blogs failed", err);
      }
    };
    fetchBlogContent();
  }, [reloadFlag]);

  const layout: ItemProps[] = [
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
          children: blogs.length
            ? blogs.map((blog) => ({
                type: "file",
                name: blog.title,
                navigation: `/blogs/${blog.id}`,
                level: 3,
              }))
            : [],
        },
      ],
    },
  ];

  return {layout, reload};
}
