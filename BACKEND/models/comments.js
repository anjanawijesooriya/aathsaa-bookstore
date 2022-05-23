const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comments = new Schema({
    user: {
        type: String,
    },
    bookName: {
        type: String,
    },
    comment: {
        type: String,
        required: true,
    },
    cDate: {
        type: Date,
    }
});

const newComments = mongoose.model("comment", Comments);
module.exports = newComments;