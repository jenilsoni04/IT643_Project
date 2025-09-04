const dotenv = require("dotenv");
const express = require("express");
const { createServer } = require("http");
const connectDB = require("./config/db");


dotenv.config();
console.log("🔍 Loaded MONGODB_URI:", process.env.MONGODB_URI);
connectDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});
const server = createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
