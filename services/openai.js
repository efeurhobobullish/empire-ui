const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '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' });

async function generateTailwindHTML(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Generate clean HTML using Tailwind CSS from this UI image. don't Avoid JS. Use responsive Tailwind classes." },
          { type: "image_url", image_url: { url: `data:image/png;base64,${imageBuffer.toString("base64")}` } }
        ]
      }
    ],
    max_tokens: 2000
  });

  return response.choices[0].message.content;
}

module.exports = { generateTailwindHTML };
