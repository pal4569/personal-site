"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = initDb;
exports.getAll = getAll;
exports.getLoad = getLoad;
exports.postCreate = postCreate;
exports.deleteBlog = deleteBlog;
exports.updateBlog = updateBlog;
exports.getEdit = getEdit;
const blogSchemas_1 = require("../validation/blogSchemas");
async function initDb(pool) {
    pool.query(`
    CREATE TABLE IF NOT EXISTS blogs (
      id SERIAL PRIMARY KEY,
      author VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Function to auto-update edited_at
    CREATE OR REPLACE FUNCTION update_edited_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.edited_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    -- Trigger that runs before every UPDATE
    DROP TRIGGER IF EXISTS update_edited_at ON blogs;
    CREATE TRIGGER update_edited_at
    BEFORE UPDATE ON blogs
    FOR EACH ROW
    EXECUTE FUNCTION update_edited_at_column();
  `);
    console.log("Blogs table is ready");
}
function getAll(pool) {
    return async (req, res) => {
        try {
            const result = await pool.query(`SELECT id, title FROM blogs`);
            res.json(result.rows);
        }
        catch (err) {
            console.error("Error fetching blogs:", err);
            res.status(500).json({ error: "Failed to fetch blogs" });
        }
    };
}
function getLoad(pool) {
    return async (req, res) => {
        try {
            const { id } = blogSchemas_1.blogIdParamSchema.parse(req.params);
            const result = await pool.query(`SELECT * FROM blogs WHERE id = $1`, [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Blog not found" });
            }
            res.json(result.rows[0]);
        }
        catch (err) {
            console.error("Error fetching blog:", err);
            res.status(500).json({ error: "Failed to fetch blog" });
        }
    };
}
function postCreate(pool) {
    return async (req, res) => {
        try {
            const { author, title, content } = blogSchemas_1.createBlogSchema.parse(req.body);
            const contentString = Array.isArray(content)
                ? content.join("\n")
                : content;
            const result = await pool.query(`INSERT INTO blogs (author, title, content) 
        VALUES ($1, $2, $3) 
        RETURNING *`, [author, title, contentString]);
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
    };
}
function deleteBlog(pool) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            const result = await pool.query(`DELETE FROM blogs WHERE id = $1 RETURNING *`, [id]);
            if (result.rowCount === 0) {
                return res.status(404).json({ error: "Blog not found" });
            }
            res.json({ message: "Blog deleted successfully" });
        }
        catch (err) {
            console.error("Error deleting blog:", err);
            res.status(500).json({ error: "Failed to delete blog" });
        }
    };
}
function updateBlog(pool) {
    return async (req, res) => {
        try {
            const { id } = req.params;
            const { author, title, content } = req.body;
            const contentString = Array.isArray(content)
                ? content.join("\n")
                : content;
            const result = await pool.query(`UPDATE blogs
         SET author = $1, title = $2, content = $3
         WHERE id = $4
         RETURNING *`, [author, title, contentString, id]);
            if (result.rowCount === 0) {
                return res.status(404).json({ error: "Blog not found" });
            }
            const updatedBlog = result.rows[0];
            const link = `/blogs/edit/${updatedBlog.id}`;
            res.json({
                message: "Blog updated successfully",
                blog: updatedBlog,
                link,
            });
        }
        catch (err) {
            console.error("Error updating blog:", err);
            res.status(500).json({ error: "Failed to update blog" });
        }
    };
}
function getEdit(pool) {
    return async (req, res) => {
        try {
            const { id } = blogSchemas_1.blogIdParamSchema.parse(req.params);
            const result = await pool.query(`SELECT * FROM blogs WHERE id = $1`, [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Blog not found" });
            }
            res.json(result.rows[0]);
        }
        catch (err) {
            console.error("Error fetching blog:", err);
            res.status(500).json({ error: "Failed to fetch blog" });
        }
    };
}
