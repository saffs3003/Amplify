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

// Register
app.post("/api/register", (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    const stmt = db.prepare(
      "INSERT INTO users (email, password, role) VALUES (?, ?, ?)"
    );
    stmt.run(email, hashedPassword, role);
    res.status(200).send("User registered");
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT") {
      res.status(400).send("User already exists");
    } else {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
});

// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  });
});

// Protected route example
app.get("/api/admin-data", verifyToken, (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  res.send("Admin secret data");
});

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
app.get("/api/users", verifyToken, (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  try {
    const stmt = db.prepare("SELECT id, email, role FROM users");
    const users = stmt.all();
    res.json(users);
  } catch (err) {
    console.error("Failed to fetch users:", err);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
