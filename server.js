const express = require("express");
const fs = require("fs");
const path = require("path");
const session = require("express-session");

const app = express();
const PORT = 3000;

// ====== MIDDLEWARE ======
app.use(express.static("public"));
app.use(express.json());

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false
  })
);

// ====== GET AWARDS ======
app.get("/api/awards", (req, res) => {
  const filePath = path.join(__dirname, "data", "awards.json");
  const data = fs.readFileSync(filePath, "utf-8");
  let awards = JSON.parse(data);

  const category = req.query.category;
  if (category) {
    awards = awards.filter(a => a.category === category);
  }

  res.json(awards);
});


// ====== GET LINKS ======
app.get("/api/links", (req, res) => {
  const filePath = path.join(__dirname, "data", "links.json");
  const data = fs.readFileSync(filePath, "utf-8");
  let links = JSON.parse(data);

  const category = req.query.category;
  if (category) {
    links = links.filter(l => l.category === category);
  }

  res.json(links);
});


// ====== LOGIN ======
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const usersPath = path.join(__dirname, "data", "users.json");
  const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    req.session.user = user.username;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

// ====== LOGOUT ======
app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

// ====== CHECK LOGIN ======
app.get("/api/check-login", (req, res) => {
  res.json({ loggedIn: !!req.session.user });
});

// ====== LOGIN CHECK MIDDLEWARE ======
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.status(403).json({ error: "Not authorized" });
  }
  next();
}

// ====== CRUD AWARDS ======
app.post("/api/awards", requireLogin, (req, res) => {
  const file = path.join(__dirname, "data", "awards.json");
  const data = JSON.parse(fs.readFileSync(file, "utf-8"));
  data.push(req.body);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

app.delete("/api/awards/:index", requireLogin, (req, res) => {
  const file = path.join(__dirname, "data", "awards.json");
  const data = JSON.parse(fs.readFileSync(file, "utf-8"));
  data.splice(req.params.index, 1);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

// ====== CRUD LINKS ======
app.post("/api/links", requireLogin, (req, res) => {
  const file = path.join(__dirname, "data", "links.json");
  const data = JSON.parse(fs.readFileSync(file, "utf-8"));
  data.push(req.body);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

app.delete("/api/links/:index", requireLogin, (req, res) => {
  const file = path.join(__dirname, "data", "links.json");
  const data = JSON.parse(fs.readFileSync(file, "utf-8"));
  data.splice(req.params.index, 1);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

// ====== START SERVER ======
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// ====== DELETE AWARD ======
app.delete("/api/awards/:id", (req, res) => {
  const filePath = path.join(__dirname, "data", "awards.json");
  let awards = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const id = parseInt(req.params.id);
  awards = awards.filter(a => a.id !== id);

  fs.writeFileSync(filePath, JSON.stringify(awards, null, 2));
  res.sendStatus(200);
});

