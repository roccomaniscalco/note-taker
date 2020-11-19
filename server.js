// Modules
const fs = require("fs");
const express = require("express");
const path = require("path");

// Express app initialization
const app = express();
const PORT = process.env.PORT || 3000;

// Express app data parsing config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Global Variables
const DB = path.join(__dirname, "/db/db.json");
const notes = JSON.parse(fs.readFileSync(DB));

// Helper Functions
console.log(notes);

// View routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API routes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  notes.push(req.body);
  fs.writeFileSync(DB, JSON.stringify(notes));
  res.json(req.body);
});

app.delete("/api/notes/:id", (req, res) => {
  notes.splice(req.params.id, 1);
  fs.writeFileSync(DB, JSON.stringify(notes));
  res.json(req.body);
});

// Listen to server
app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
