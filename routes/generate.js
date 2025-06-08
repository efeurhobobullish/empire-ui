const express = require("express");
const router = express.Router();
const { generateTailwindHTML } = require("../services/openai");

router.post("/", async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No image uploaded." });

    const htmlCode = await generateTailwindHTML(file.path);
    res.json({ code: htmlCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate code." });
  }
});

module.exports = router;
