import { Pool } from "pg";
import { blogIdParamSchema, createBlogSchema } from "../validation/blogSchemas.ts";
import type { Request, Response } from "express";

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

      const result = await pool.query(
        `INSERT INTO blogs (author, title, content) 
        VALUES ($1, $2, $3) 
        RETURNING *`,
        [author, title, content]
      );

      res.json(result.rows[0]);
    } 
    
    catch (err) {
      console.error("Error creating blog:", err);
      res.status(500).json({ error: "Failed to create blog" });
    }
  }
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