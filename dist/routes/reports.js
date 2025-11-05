"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/reports.ts
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
// Use process.cwd() to always point to the root of the project
const filePath = path_1.default.join(__dirname, "../data/reports.json");
// GET all reports
router.get("/", (req, res) => {
    const data = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
    res.json(data);
});
// GET report by ID
router.get("/:id", (req, res) => {
    const data = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
    const report = data.find((r) => r.id === req.params.id);
    if (report)
        res.json(report);
    else
        res.status(404).json({ message: "Report not found" });
});
// POST new report
router.post("/", (req, res) => {
    const data = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
    const newReport = { id: Date.now().toString(), ...req.body };
    data.push(newReport);
    fs_1.default.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.status(201).json(newReport);
});
exports.default = router;
