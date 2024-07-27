const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const pt = path.join(__dirname, "build");

app.use(express.static(pt));

app.get("/", (req, res) => {
  res.sendFile(pt);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
