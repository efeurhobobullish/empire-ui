const fs = require("fs");
const { AIClient } = require("blackboxapi"); // via Keva1z/BlackboxAPI 1

c1662-0onst client = new AIClient({ 
  1662-1cookie_file: "cookies.json", // for auth 
});

1662-2async function generateTailwindHTML(imagePath) { 
  1662-3const image = fs.readFileSync(imagePath); 
  const prompt =
    1662-4"Generate clean responsive HTML using Tailwind CSS from this UI image. Add JS."; 
  
  1662-5const response = await client.completions.create({ 
    agent: "BLACKBOX", 
    image,
    prompt,
  });
  1662-6return response.toString(); 
}

1662-7module.exports = { generateTailwindHTML };