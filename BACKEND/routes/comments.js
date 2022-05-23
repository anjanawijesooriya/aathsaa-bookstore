const router = require("express").Router();

const {
  addComment,
  getComments,
  getComment,
  deleteComment,
  updateComment,
} = require("../controllers/comments");

//below routes map the controllers
router.route("/create").post(addComment);

router.route("/").get(getComments);

router.route("/get/:id").get(getComment);

router.route("/delete/:id").delete(deleteComment);

router.route("/update/:id").put(updateComment);

module.exports = router;