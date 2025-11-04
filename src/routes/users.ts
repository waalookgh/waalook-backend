import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";

export type User = {
  id: string;
  name: string;
  email: string;
};

const router = Router();
const filePath = path.join(__dirname, "../data/users.json");

router.get("/", (req: Request, res: Response) => {
  const data: User[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(data);
});

export default router;
