"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchReports = fetchReports;
exports.fetchReportById = fetchReportById;
exports.fetchUsers = fetchUsers;
// services/api.ts
const BASE_URL = process.env.WAALOOK_API;
async function fetchReports() {
    const response = await fetch(`${BASE_URL}/reports`);
    if (!response.ok)
        throw new Error("Failed to fetch reports");
    return response.json();
}
async function fetchReportById(id) {
    const response = await fetch(`${BASE_URL}/reports/${id}`);
    if (!response.ok)
        throw new Error("Report not found");
    return response.json();
}
async function fetchUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok)
        throw new Error("Failed to fetch users");
    return response.json();
}
