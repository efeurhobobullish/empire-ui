require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const generateRoute = require("./routes/generate");

const app = express();
const PORT = process.env.PORT || 5000;
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use("/generate", upload.single("image"), generateRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));