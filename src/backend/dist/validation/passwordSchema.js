"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginIdSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
});
exports.loginIdSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
