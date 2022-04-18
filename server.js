const express = require("express");
const jwt = require("jsonwebtoken");

const users = require("./db");
const verifyToken = require("./middleware/auth");

const app = express();
require("dotenv").config();

app.use(express.json());

app.get("/posts", verifyToken, (req, res) => {
  console.log({ user: req.user });
  return res.json({
    posts: "My Posts",
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return req.sendStatus(401);
  }

  //Create JWT
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ token });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Serveer is running on port ${PORT}`);
});
