// Dependencies
const express = require("express");
const path = require("path");

// Express app initialization
const app = express();
const PORT = process.env.PORT || 3000;

// Express app data parsing config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Listen to server
app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
