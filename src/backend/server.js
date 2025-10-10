import express from "express";
import cors from "cors";
import { Pool } from "pg";
import { getAll, getLoad, postCreate, getEdit, deleteBlog, updateBlog, initDb } from "./controller/blog.controller.ts";
import { initVideoDb, getAllVideos, getLoadVideo } from './controller/video.controller.ts';

const app = express();
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cruddb",
  password: "Agario314!",
  port: 5432,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/blogs/new', postCreate(pool));
app.get("/api/blogs/:id", getLoad(pool));
app.get("/api/blogs", getAll(pool));
app.get("/api/blogs/edit/:id", getEdit(pool));
app.delete("/api/blogs/:id", deleteBlog(pool));
app.put("/api/blogs/:id", updateBlog(pool));

app.get("/api/videos", getAllVideos(pool));
app.get("/api/videos/:id", getLoadVideo(pool));

initDb(pool).catch(err => console.error("DB init failed:", err));
initVideoDb(pool).catch(err => console.error("DB init failed:", err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});