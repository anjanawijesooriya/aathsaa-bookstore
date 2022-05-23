const Comments = require("../models/comments");

//adding comments
exports.addComment = async (req, res) => {
  const { user, bookName, comment } = req.body;

  const cDate = Date(req.body.cDate);

  const newComments = new Comments({
    user,
    bookName,
    comment,
    cDate,
  }); //create a new object using database schema

  await newComments
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => res.status(500).json({ success: false, error: error })); //else save to the db
};

//get all comments
exports.getComments = async (req, res) => {
  await Comments.find()
    .then((comments) => res.json(comments))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

//get relevant comment by id
exports.getComment = async (req, res) => {
  const { id } = req.params;

  await Comments.findById(id)
    .then((comments) => res.json(comments))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

//deleting comment
exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  await Comments.findByIdAndDelete(id)
    .then(() => res.json({ message: "Successfully Deleted " }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

//updating comment
exports.updateComment = async (req, res) => {
  const { id } = req.params;

  const { comment } = req.body;

  await Comments.findByIdAndUpdate(id, {
    comment,
  })
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, error: error }));
};