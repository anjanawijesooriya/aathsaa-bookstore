const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Books = new Schema({
  bookName: {
    type: String,
  },
  author: {
    type: String,
  },
  bookDesc: {
    type: String,
  },
  bookCategory: {
    type: String,
  },
  addedDate: {
    type: Date,
  },
  image: {
    type: String,
  },
  bookUrl: {
    type: String,
  },
  likes: {
    type: Number,
  },
  downloads: {
    type: Number,
  },
  user:Object
});

const newBooks = mongoose.model("book", Books);
module.exports = newBooks;