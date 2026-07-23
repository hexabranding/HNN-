require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");
const categoriesRoutes = require("./routes/categories");
const tagsRoutes = require("./routes/tags");
const pagesRoutes = require("./routes/pages");
const authorsRoutes = require("./routes/authors");
const settingsRoutes = require("./routes/settings");
const adsRoutes = require("./routes/ads");
const uploadRoutes = require("./routes/upload");

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_DIR = path.join(__dirname, "..");

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://localhost:4000"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/images", express.static(path.join(FRONTEND_DIR, "images")));
app.use("/style.css", express.static(path.join(FRONTEND_DIR, "style.css")));
app.use("/script.js", express.static(path.join(FRONTEND_DIR, "script.js")));
app.use("/category-extra-news.js", express.static(path.join(FRONTEND_DIR, "category-extra-news.js")));

app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/tags", tagsRoutes);
app.use("/api/pages", pagesRoutes);
app.use("/api/authors", authorsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/ads", adsRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "HEXA NEWS API", timestamp: new Date().toISOString() });
});

const htmlPages = [
  "index.html", "about.html", "contact.html", "author.html",
  "post-detail.html", "blog-classic.html", "blog-masonry.html", "blog-standard.html",
  "sports.html", "health.html", "technology.html", "business.html",
  "asia.html", "europe.html", "africa.html", "australia.html",
  "north-america.html", "south-america.html", "antarctica.html",
  "404.html", "admin.html",
];

htmlPages.forEach((page) => {
  const route = "/" + page.replace(".html", "");
  app.get(route, (_req, res) => {
    res.sendFile(path.join(FRONTEND_DIR, page));
  });
});

app.get("/", (_req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, "index.html"));
});

app.get("/admin", (_req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, "admin.html"));
});

app.use((_req, res) => {
  res.status(404).sendFile(path.join(FRONTEND_DIR, "404.html"));
});

app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n HEXA NEWS Backend running on http://localhost:${PORT}`);
    console.log(`   Frontend: http://localhost:${PORT}/`);
    console.log(`   API:      http://localhost:${PORT}/api/health\n`);
  });
});
