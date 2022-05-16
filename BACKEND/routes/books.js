const router = require("express").Router();

const {
  createBook,
  getBooks,
  getBook,
  deleteBooks,
  updateBooks,
  updateLikes,
  updateDownloads,
} = require("../controllers/books");

//below routes map the controllers
router.route("/create").post(createBook);

router.route("/").get(getBooks);

router.route("/get/:id").get(getBook);

router.route("/delete/:id").delete(deleteBooks);

router.route("/update/:id").put(updateBooks);

router.route("/likes/:id").put(updateLikes);

router.route("/downloads/:id").put(updateDownloads);

module.exports = router;
