"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
let reports = [
    {
        id: "1",
        poster: "John Doe",
        title: "Broken Streetlight",
        description: "The streetlight has been out for 2 weeks.",
        urgency: "High",
        category: "Infrastructure",
        image: "https://placehold.co/400x400/jpg",
        time: "2h",
        likes: 12,
        comments: 3,
        shares: 1,
    },
];
app.get("/api/reports", (req, res) => res.json(reports));
app.get("/api/reports/:id", (req, res) => {
    const report = reports.find((r) => r.id === req.params.id);
    if (!report)
        return res.status(404).json({ error: "Not found" });
    res.json(report);
});
app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
