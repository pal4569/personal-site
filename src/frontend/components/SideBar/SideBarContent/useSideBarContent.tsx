import { useState, useEffect } from "react";
import type { ItemProps } from "../../SideBarItem/SidebarItem";

type JustIdTitle = {
  id: number;
  title: string;
};

export function useSideBarContent(): ItemProps[] {
  const [blogs, setBlogs] = useState<JustIdTitle[]>([]);

  useEffect(() => {
    const fetchBlogContent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/blogs/`);
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
  }, []);

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
          navigation: "/create",
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
                navigation: `/load/${blog.id}`,
                level: 3,
              }))
            : [],
        },
      ],
    },
  ];

  return layout;
}
