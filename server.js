const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const JWT_SECRET = "supersecretkey";

app.use(cors());
app.use(bodyParser.json());

// Test route
app.get("/api/works", (req, res) => {
  console.log("works");
  res.status(200).send("OK");
});

// Register new user
app.post("/api/register", (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const stmt = db.prepare(
    "INSERT INTO users (email, password, role) VALUES (?, ?, ?)"
  );

  stmt.run(email, hashedPassword, role, function (err) {
    if (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        console.warn("Duplicate email detected:", email);
        return res.status(400).json({ message: "User already exists" });
      }

      console.error("DB Error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    const userId = this.lastID;
    const token = jwt.sign({ id: userId, role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      accessToken: token,
      user: { id: userId, email, role },
    });
  });
});

// Login existing user
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) {
      console.error("DB error during login:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" }); // Don't expose if user exists
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      accessToken: token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  });
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Admin-only data route
app.get("/api/admin-data", verifyToken, (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  res.send("Admin secret data");
});

// Admin-only user list
app.get("/api/users", verifyToken, (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  try {
    const stmt = db.prepare("SELECT id, email, role FROM users");
    const users = stmt.all();
    res.json(users);
  } catch (err) {
    console.error("Failed to fetch users:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
