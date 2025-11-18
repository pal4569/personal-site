import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

import {
  getAll, getLoad, postCreate, getEdit, deleteBlog, updateBlog, initDb
} from "./controller/blog.controller";
import {
  initVideoDb, getAllVideos, getLoadVideo
} from "./controller/video.controller";
import { postLogin, requireAuth } from "./controller/password.controller";
import { JwtPayload } from "jsonwebtoken";
import cookieParser from "cookie-parser";

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

dotenv.config();
const app = express();

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server, Postman, etc.
    if (!origin) return callback(null, true);
    return callback(null, true); // Reflect origin automatically
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { require: true, rejectUnauthorized: false }
});

pool.connect()
  .then(() => console.log("Connected to Render PostgreSQL"))
  .catch(err => console.error("Database connection error:", err));

app.get("/api/test", (req, res) => res.send("Server running ✅"));


// Blogs
app.post('/api/blogs/new', postCreate(pool));
app.get("/api/blogs/:id", getLoad(pool));
app.get("/api/blogs", getAll(pool));
app.get("/api/blogs/edit/:id", getEdit(pool));
app.delete("/api/blogs/:id", deleteBlog(pool));
app.put("/api/blogs/:id", updateBlog(pool));

// Videos
app.get("/api/videos", getAllVideos(pool));
app.get("/api/videos/:id", getLoadVideo(pool));

// Passwords
app.post("/api/login", postLogin());
app.get("/api/secure", requireAuth, (req, res) => {
  const userReq = req as unknown as AuthenticatedRequest;
  res.json({ user: userReq.user });
});

app.post("/api/signout", (req, res) => {
  res.clearCookie("auth_token");
  res.status(200).json({ message: "Logged out" });
});

app.get("/api/lastUpdated", async (req, res) => {
  try {
    const repo = "pal4569/personal-site";
    const url = `https://api.github.com/repos/${repo}/commits?per_page=1`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("GitHub response:", data);
    const [latest] = data;
    const date = latest.commit?.author?.date || null;
    console.log("Extracted date:", date);

    res.json({ date: latest.commit.author.date });
  } catch (err) {
    console.error("Error fetching last updated date:", err);
    res.status(500).json({ error: "Failed to fetch last updated date" });
  }
});

initDb(pool).catch(err => console.error("DB init failed:", err));
initVideoDb(pool).catch(err => console.error("DB init failed:", err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});