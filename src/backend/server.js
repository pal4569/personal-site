import express from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();
const pool = new Pool({
  user: "postgres",          // default superuser
  host: "localhost",         // your local machine
  database: "cruddb",        // make sure this DB exists
  password: "Agario314!",      // whatever password you set for postgres
  port: 5432,                // default port
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function initDb() {
  await pool.query(`
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

app.post("/blogs", async (req, res) => {
  try {
    const { author, title, content } = req.body;
    const result = await pool.query(
      `INSERT INTO blogs (author, title, content) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [author, title, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ error: "Failed to create blog" });
  }
});

app.get("/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
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
});


initDb().catch(err => console.error("DB init failed:", err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
