const express = require("express");
const app = express();

app.get("/posts", (req, res) => {
  return res.json({
    posts: "My Posts",
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Serveer is running on port ${PORT}`);
});
