const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const { createServer } = require("http");
const app = require("./app");

dotenv.config();
connectDB();

const server = createServer(app);

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
server.listen(PORT);