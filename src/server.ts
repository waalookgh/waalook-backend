import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import reportsRoutes from "./routes/reports";
import usersRoutes from "./routes/users";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/reports", reportsRoutes);
app.use("/api/users", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
