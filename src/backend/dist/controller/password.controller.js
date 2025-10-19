import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";
export function postLogin() {
    return async (req, res) => {
        try {
            const { username, password } = req.body;
            if (username !== "admin") {
                return res.status(401).json({ error: "Invalid username" });
            }
            const match = await bcrypt.compare(password, process.env.ADMIN_HASH);
            if (!match) {
                console.log("Invalid password attempt");
                return res.status(401).json({ error: "Invalid password" });
            }
            const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
            res.cookie("auth_token", token, {
                httpOnly: true,
                sameSite: "lax",
                secure: false,
                maxAge: 60 * 60 * 1000,
            });
            return res.status(200).json({ message: "Login successful" });
        }
        catch (err) {
            console.error("Error logging in:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    };
}
export function requireAuth(req, res, next) {
    const token = req.cookies?.auth_token;
    if (!token) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}
