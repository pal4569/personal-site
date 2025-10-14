"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoIdParamSchema = exports.createVideoSchema = void 0;
const zod_1 = require("zod");
exports.createVideoSchema = zod_1.z.object({
    link: zod_1.z.string().min(1),
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
});
exports.videoIdParamSchema = zod_1.z.object({
    id: zod_1.z.string(),
});
