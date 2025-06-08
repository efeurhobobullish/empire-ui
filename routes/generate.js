const express = require("express");
const router = express.Router();
const { generateTailwindHTML } = require("../services/blackbox");

router.post("/", async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image uploaded." });
  try {
    const code = await generateTailwindHTML(req.file.path);
    res.json({ code });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Blackbox API generation failed." });
  }
});

module.exports = router;