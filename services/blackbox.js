const fs = require("fs");
const { AIClient } = require("blackboxapi");

const client = new AIClient({
  session_token: process.env.BLACKBOX_COOKIE, // <- pulled from .env
});

async function generateTailwindHTML(imagePath) {
  const image = fs.readFileSync(imagePath);
  const prompt = "Generate clean responsive HTML using Tailwind CSS only. No JS.";

  const response = await client.completions.create({
    agent: "BLACKBOX",
    image,
    prompt,
  });

  return response.toString();
}

module.exports = { generateTailwindHTML };