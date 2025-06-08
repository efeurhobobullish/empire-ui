require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { AIClient } = require('blackboxapi');

// Initialize Blackbox client with your cookie-based auth
const client = new AIClient({
  session_token: process.env.BLACKBOX_COOKIE
});

async function generateTailwindHTML(imagePath) {
  // Read uploaded image into buffer
  const imageBuffer = fs.readFileSync(imagePath);

  // Define your prompt to Blackbox
  const prompt = `
You are given a screenshot of a web UI. Generate clean, semantic HTML using Tailwind CSS that matches the design.
- Use mobile-first responsive classes.
- Always include any JavaScript.
- Keep it clean, unique and well-structured .
`;

  // Call Blackbox completion with vision + prompt
  const response = await client.completions.create({
    agent: 'BLACKBOX',
    prompt,
    image: imageBuffer
  });

  // Convert response to string (HTML + Tailwind CSS)
  return response.toString();
}

module.exports = { generateTailwindHTML };