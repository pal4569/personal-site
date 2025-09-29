import express from "express";
import cors from "cors";
import { Pool } from "pg";
import { getAll, getLoad, postCreate, getEdit, initDb } from "./controller/blog.controller.ts";

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

initDb(pool).catch(err => console.error("DB init failed:", err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});