const express = require("express");
const Ad = require("../models/Ad");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

const DEFAULT_SLOTS = [
  { slot: "top-leaderboard", label: "Top Leaderboard (728 x 90)", title: "Page Top Ad" },
  { slot: "mid-leaderboard", label: "Mid Leaderboard (970 x 90)", title: "Page Mid Ad" },
  { slot: "bottom-leaderboard", label: "Bottom Leaderboard (728 x 90)", title: "Page Bottom Ad" },
  { slot: "sidebar", label: "Sidebar (300 x 250)", title: "Sidebar Ad" },
  { slot: "category", label: "Category Page Ad", title: "Category Page Ad" },
  { slot: "article", label: "In-Article Ad (300 x 250)", title: "Article Ad" },
  { slot: "search", label: "Search Page Ad", title: "Search Page Ad" },
  { slot: "tags", label: "Tags Page Ad", title: "Tags Page Ad" },
  { slot: "media", label: "Media Page Ad", title: "Media Page Ad" },
  { slot: "page", label: "Info Page Ad", title: "Info Page Ad" },
];

router.get("/", async (_req, res) => {
  try {
    const ads = await Ad.find({ active: true }).sort({ slot: 1 });
    res.json(ads.map((a) => a.toJSON()));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/all", authMiddleware, async (_req, res) => {
  try {
    const ads = await Ad.find().sort({ slot: 1 });
    res.json(ads.map((a) => a.toJSON()));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/slots", async (_req, res) => {
  res.json(DEFAULT_SLOTS);
});

router.get("/:slot", async (req, res) => {
  try {
    const ad = await Ad.findOne({ slot: req.params.slot, active: true });
    if (!ad) return res.json(null);
    res.json(ad.toJSON());
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { slot, title, image, link, active, label } = req.body;
    if (!slot) return res.status(400).json({ error: "slot is required" });

    const ad = await Ad.findOneAndUpdate(
      { slot },
      {
        slot,
        title: title || "",
        image: image || "",
        link: link || "",
        active: active !== false,
        label: label || "",
      },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(201).json(ad.toJSON());
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:slot", authMiddleware, async (req, res) => {
  try {
    const ad = await Ad.findOneAndUpdate(
      { slot: req.params.slot },
      { ...req.body, slot: req.params.slot },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(ad.toJSON());
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:slot", authMiddleware, async (req, res) => {
  try {
    const ad = await Ad.findOneAndDelete({ slot: req.params.slot });
    if (!ad) return res.status(404).json({ error: "Ad not found" });
    res.json({ message: "Ad deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
