"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initVideoDb = initVideoDb;
exports.getAllVideos = getAllVideos;
exports.getLoadVideo = getLoadVideo;
const videoSchema_1 = require("../validation/videoSchema");
async function initVideoDb(pool) {
    pool.query(`
    CREATE TABLE IF NOT EXISTS videos (
      id SERIAL PRIMARY KEY,
      link VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL
    );
  `);
    console.log("Videos table is ready");
}
function getAllVideos(pool) {
    return async (req, res) => {
        try {
            const result = await pool.query(`SELECT id, title FROM videos`);
            res.json(result.rows);
        }
        catch (err) {
            console.error("Error fetching blogs:", err);
            res.status(500).json({ error: "Failed to fetch videos" });
        }
    };
}
function getLoadVideo(pool) {
    return async (req, res) => {
        try {
            const { id } = videoSchema_1.videoIdParamSchema.parse(req.params);
            const result = await pool.query(`SELECT * FROM videos WHERE id = $1`, [id]);
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
