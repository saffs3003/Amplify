// server.js
// const jsonServer = require("json-server");
// const auth = require("json-server-auth");

// const app = jsonServer.create();
// const router = jsonServer.router("db.json");
// app.db = router.db;

// app.use(jsonServer.defaults());
// app.use(auth);
// app.use(router);

// app.listen(3000, () => console.log("Running on http://localhost:3000"));
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./auth");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(authRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
