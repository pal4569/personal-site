"use strict";
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const { getAll, getLoad, postCreate, getEdit, deleteBlog, updateBlog, initDb, } = require("./controller/blog.controller");
const { initVideoDb, getAllVideos, getLoadVideo, } = require("./controller/video.controller");
const { postLogin } = require("./controller/password.controller").default;
const app = express();
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "cruddb",
    password: "Agario314!",
    port: 5432,
});
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
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
initDb(pool).catch((err) => console.error("DB init failed:", err));
initVideoDb(pool).catch((err) => console.error("DB init failed:", err));
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
