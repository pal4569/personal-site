"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = postLogin;
const bcrypt_1 = __importDefault(require("bcrypt"));
function postLogin() {
    return async (req, res) => {
        try {
            const { username, password } = req.body;
            if (username !== "admin") {
                return res.status(401).json({ error: "Invalid username" });
            }
            const match = await bcrypt_1.default.compare(password, process.env.ADMIN_HASH);
            if (!match) {
                console.log("Invalid password attempt");
                return res.status(401).json({ error: "Invalid password" });
            }
            res.json({ message: "Login successful" });
        }
        catch (err) {
            console.error("Error logging in:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    };
}
