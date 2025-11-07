// backend/src/index.ts
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

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
  if (!report) return res.status(404).json({ error: "Not found" });
  res.json(report);
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
