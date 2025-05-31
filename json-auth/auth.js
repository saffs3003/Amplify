const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("./db");
const router = express.Router();

const SECRET_KEY = "supersecret123"; // for development

// Register
router.post("/register", async (req, res) => {
  const { email, password, name, gender, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (email, password, name, gender, role) VALUES (?, ?, ?, ?, ?)`,
    [email, hashedPassword, name, gender, role],
    function (err) {
      if (err) return res.status(400).json({ error: "User already exists" });

      const user = { id: this.lastID, email, name, gender, role };
      const accessToken = jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });

      res.json({ accessToken, user });
    }
  );
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err || !user)
      return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const { password: _, ...userData } = user;
    const accessToken = jwt.sign(userData, SECRET_KEY, { expiresIn: "1h" });

    res.json({ accessToken, user: userData });
  });
});

module.exports = router;
