import express from "express";
import cors from "cors";
import { Pool } from "pg";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import type { JwtPayload } from "jsonwebtoken";
import { 
  getAll, getLoad, postCreate, getEdit, deleteBlog, updateBlog, initDb 
} from "./controller/blog.controller.ts";
import { 
  initVideoDb, getAllVideos, getLoadVideo 
} from "./controller/video.controller.ts";
import { postLogin, requireAuth } from "./controller/password.controller.ts";

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}


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
app.use(cookieParser());

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
app.get("/api/secure", requireAuth, (req, res) => {
  const userReq = req as unknown as AuthenticatedRequest;
  res.json({ user: userReq.user });
});
app.post("/api/signout", (req, res) => {
  res.clearCookie("auth_token");
  res.status(200).json({ message: "Logged out" });
});

initDb(pool).catch(err => console.error("DB init failed:", err));
initVideoDb(pool).catch(err => console.error("DB init failed:", err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});