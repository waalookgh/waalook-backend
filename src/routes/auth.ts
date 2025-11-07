import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const usersPath = path.join(__dirname, "../data/users.json");

// Ensure the data folder exists
if (!fs.existsSync(path.dirname(usersPath))) {
  fs.mkdirSync(path.dirname(usersPath), { recursive: true });
}

// Helper: Read users file
const readUsers = () => {
  if (!fs.existsSync(usersPath)) return [];
  const data = fs.readFileSync(usersPath, "utf-8");
  return data ? JSON.parse(data) : [];
};

// Helper: Write users file
const writeUsers = (data: any) => {
  fs.writeFileSync(usersPath, JSON.stringify(data, null, 2));
};

// ✅ Register user (send OTP)
router.post("/register", (req: Request, res: Response) => {
  const { firstName, lastName, phone, dateOfBirth, gender, citizenship } = req.body;

  if (!firstName || !lastName || !phone || !dateOfBirth || !gender || !citizenship) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const users = readUsers();
  const existingUser = users.find((u: any) => u.phone === phone);

  if (existingUser) {
    return res.status(400).json({ message: "Phone number already registered" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const newUser = {
    id: Date.now().toString(),
    firstName,
    lastName,
    phone,
    dateOfBirth,
    gender,
    citizenship,
    otp,
    verified: false,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  console.log(`✅ OTP for ${phone}: ${otp}`);

  return res.json({
    message: "Account created successfully. OTP sent.",
    userId: newUser.id,
  });
});

// ✅ Verify OTP
router.post("/verify", (req: Request, res: Response) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.status(400).json({ message: "Missing userId or OTP" });
  }

  const users = readUsers();
  const user = users.find((u: any) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  user.verified = true;
  writeUsers(users);

  return res.json({
    message: "Account verified successfully!",
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      verified: user.verified,
    },
  });
});

// ✅ Route: Login user
router.post("/login", (req: Request, res: Response) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  const users = readUsers();
  const user = users.find((u: any) => u.phone === phone);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate a new OTP for login
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.verified = false;

  writeUsers(users);
  console.log(`Login OTP for ${phone}: ${otp}`);

  return res.json({
    message: "OTP sent successfully. Please verify to continue.",
    userId: user.id,
  });
});


export default router;
