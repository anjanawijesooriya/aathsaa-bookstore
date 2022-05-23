const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB was Connected Successfully");
});

const app = express();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is up and running in port ${PORT}`);
});

app.use("/api/auth", require("./BACKEND/routes/auth"));
app.use("/books", require("./BACKEND/routes/books"));
app.use("/comments", require("./BACKEND/routes/comments"));