// src/routes/reports.ts
import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";

export type Report = {
  id: string;
  poster: string;
  title: string;
  description: string;
  urgency: "Low" | "Medium" | "High" | "Critical";
  category: string;
  image: string;
  time: string;
  likes: number;
  comments: number;
  shares: number;
};

const router = Router();

// Use process.cwd() to always point to the root of the project
const filePath = path.join(__dirname, "../data/reports.json");

// GET all reports
router.get("/", (req: Request, res: Response) => {
  const data: Report[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(data);
});

// GET report by ID
router.get("/:id", (req: Request, res: Response) => {
  const data: Report[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const report = data.find((r) => r.id === req.params.id);
  if (report) res.json(report);
  else res.status(404).json({ message: "Report not found" });
});

// POST new report
router.post("/", (req: Request, res: Response) => {
  const data: Report[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const newReport: Report = { id: Date.now().toString(), ...req.body };
  data.push(newReport);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(201).json(newReport);
});

export default router;
