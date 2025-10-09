import { Pool } from "pg";
import { blogIdParamSchema, createBlogSchema } from "../validation/blogSchemas.ts";
import type { Request, Response } from "express";

interface Blog {
  id: number;
  author: string;
  title: string;
  content: string;
}

export async function initDb(pool: Pool) {
  pool.query(`
    CREATE TABLE IF NOT EXISTS blogs (
      id SERIAL PRIMARY KEY,
      author VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("Blogs table is ready");
}

export function getAll(pool: Pool) {
  return async (req: Request, res: Response) => {
    try {
      const result = await pool.query(
        `SELECT id, title FROM blogs`,
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "No blogs found" });
      }

      res.json(result.rows);
    } 
    
    catch (err) {
      console.error("Error fetching blogs:", err);
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  }
}

export function getLoad(pool: Pool) {
  return async (req: Request, res: Response) => {
    try {
      const { id } = blogIdParamSchema.parse(req.params);

      const result = await pool.query(
        `SELECT * FROM blogs WHERE id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Blog not found" });
      }

      res.json(result.rows[0]);
    } 
    
    catch (err) {
      console.error("Error fetching blog:", err);
      res.status(500).json({ error: "Failed to fetch blog" });
    }
  }
}

export function postCreate(pool: Pool) {
  return async (req: Request, res: Response) => {
    try {
      const { author, title, content } = createBlogSchema.parse(req.body);

      const contentString = Array.isArray(content)
        ? content.join("\n")
        : content;

      const result = await pool.query<Blog>(
        `INSERT INTO blogs (author, title, content) 
        VALUES ($1, $2, $3) 
        RETURNING *`,
        [author, title, contentString]
      );

      const newBlog = result.rows[0];
      const link = `/blogs/edit/${newBlog.id}`;

      res.json({
        message: "Blog created successfully",
        blog: newBlog,
        link: link
      });
    } 
    
    catch (err) {
      console.error("Error creating blog:", err);
      res.status(500).json({ error: "Failed to create blog" });
    }
  }
}

export function deleteBlog(pool: Pool) {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await pool.query(`DELETE FROM blogs WHERE id = $1 RETURNING *`, [id]);

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Blog not found" });
      }

      res.json({ message: "Blog deleted successfully" });
    } catch (err) {
      console.error("Error deleting blog:", err);
      res.status(500).json({ error: "Failed to delete blog" });
    }
  };
}

export function updateBlog(pool: Pool) {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { author, title, content } = req.body;

      const contentString = Array.isArray(content)
        ? content.join("\n")
        : content;

      const result = await pool.query(
        `UPDATE blogs
         SET author = $1, title = $2, content = $3
         WHERE id = $4
         RETURNING *`,
        [author, title, contentString, id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Blog not found" });
      }

      const updatedBlog = result.rows[0];
      const link = `/blogs/${updatedBlog.id}`;

      res.json({
        message: "Blog updated successfully",
        blog: updatedBlog,
        link,
      });
    } catch (err) {
      console.error("Error updating blog:", err);
      res.status(500).json({ error: "Failed to update blog" });
    }
  };
}


export function getEdit(pool: Pool) {
  return async (req: Request, res: Response) => {
    try {
      const { id } = blogIdParamSchema.parse(req.params);

      const result = await pool.query(
        `SELECT * FROM blogs WHERE id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Blog not found" });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.error("Error fetching blog:", err);
      res.status(500).json({ error: "Failed to fetch blog" });
    }
  }
}