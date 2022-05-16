const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Books = new Schema({
  bookName: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  bookDesc: {
    type: String,
    required: true,
  },
  bookCategory: {
    type: String,
    required: true,
  },
  addedDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  bookUrl: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  downloads: {
    type: Number,
  },
});

const newBooks = mongoose.model("book", Books);
module.exports = newBooks;