const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is Running"));
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

module.exports = app;