const express = require("express");

const { posts } = require("./db");
const verifyToken = require("./middleware/auth");

const app = express();
require("dotenv").config();

app.use(express.json());

app.get("/posts", verifyToken, (req, res) => {
  const id = req.user.id;
  const userPosts = posts.find((post) => post.userId === id);
  return res.json({
    posts: userPosts,
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Serveer is running on port ${PORT}`);
});
