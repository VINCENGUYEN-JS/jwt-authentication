const express = require("express");
const jwt = require("jsonwebtoken");

let { users } = require("./db");
const verifyToken = require("./middleware/auth");

const app = express();
require("dotenv").config();

app.use(express.json());

const generateTokens = (payload) => {
  const { id, username } = payload;
  //Create JWT
  const token = jwt.sign({ id, username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15s",
  });

  //Create Refresh Token
  const refreshToken = jwt.sign(
    { id, username },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return {
    token,
    refreshToken,
  };
};

const updateRefreshToken = (username, refreshToken) => {
  users = users.map((user) => {
    if (user.username === username) {
      user.refreshToken = refreshToken;
    }
    return user;
  });
};

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return req.sendStatus(401);
  }

  const tokens = generateTokens(user);
  updateRefreshToken(username, tokens.refreshToken);
  console.log({ users });
  res.json(tokens);
});

app.post("/token", (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.sendStatus(401);
  }
  const user = users.find((user) => user.refreshToken === refreshToken);
  if (!user) return res.sendStatus(403);
  try {
    jwt.verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const tokens = generateTokens(user);
    updateRefreshToken(user.username, tokens.refreshToken);
    res.json(tokens);
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
});

app.delete("/logout", verifyToken, (req, res) => {
  const { id } = req.user;
  const user = user.find((user) => user.id === id);
  updateRefreshToken(user.username, null);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveer is running on port ${PORT}`);
});
