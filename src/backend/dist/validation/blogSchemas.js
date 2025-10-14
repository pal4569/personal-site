"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogIdParamSchema = exports.updateBlogSchema = exports.createBlogSchema = void 0;
const zod_1 = require("zod");
exports.createBlogSchema = zod_1.z.object({
    author: zod_1.z.string().min(1),
    title: zod_1.z.string().min(1),
    content: zod_1.z.array(zod_1.z.string()).min(1),
});
exports.updateBlogSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    content: zod_1.z.array(zod_1.z.string().min(1)),
});
exports.blogIdParamSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
