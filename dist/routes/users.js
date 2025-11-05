"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const filePath = path_1.default.join(__dirname, "../data/users.json");
router.get("/", (req, res) => {
    const data = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
    res.json(data);
});
exports.default = router;
