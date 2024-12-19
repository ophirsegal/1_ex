const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const postsRoute = require("./routes/post_route");
const commentRoutes = require("./routes/comment_route");

const app = express();

app.use(bodyParser.json());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use("/posts", postsRoute);
app.use("/comments", commentRoutes);


const uri = process.env.DB_CONNECT || "mongodb://localhost:27017/task1"; 


if (mongoose.connection.readyState === 0) {
  mongoose.connect(uri)
    .then(() => console.log("Connected to database"))
    .catch(err => console.log("Database connection error:", err));
}

const db = mongoose.connection;
db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("MongoDB connected"));

module.exports = app; 

