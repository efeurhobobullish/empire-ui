require("dotenv").config(); // Load .env vars

const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateTailwindHTML(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Generate clean HTML using Tailwind CSS from this UI image. Don't avoid JS. Use responsive Tailwind classes.",
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${imageBuffer.toString("base64")}`,
            },
          },
        ],
      },
    ],
    max_tokens: 2000,
  });

  return response.choices[0].message.content;
}

module.exports = { generateTailwindHTML };
