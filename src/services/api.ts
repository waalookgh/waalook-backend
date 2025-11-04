// services/api.ts
const BASE_URL = process.env.WAALOOK_API;

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

export type User = {
  id: string;
  name: string;
  email: string;
};

export async function fetchReports(): Promise<Report[]> {
  const response = await fetch(`${BASE_URL}/reports`);
  if (!response.ok) throw new Error("Failed to fetch reports");
  return response.json();
}

export async function fetchReportById(id: string): Promise<Report> {
  const response = await fetch(`${BASE_URL}/reports/${id}`);
  if (!response.ok) throw new Error("Report not found");
  return response.json();
}

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
}
