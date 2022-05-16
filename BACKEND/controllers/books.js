const Books = require("../models/books");

//adding books
exports.createBook = async (req, res) => {
  const { bookName, author, bookDesc, bookCategory, image, bookUrl } = req.body;

  const addedDate = Date(req.body.addedDate);
  const likes = Number(req.body.likes) + 1;
  const downloads = Number(req.body.downloads) + 1;

  const newBooks = new Books({
    bookName,
    author,
    bookDesc,
    bookCategory,
    image,
    bookUrl,
    addedDate,
    likes,
    downloads,
  }); //create a new object using database schema

  const isAvailable = await Books.findOne({
    //check the availability of saving data
    bookName: { $regex: new RegExp(bookName, "i") },
  });

  if (isAvailable) {
    return res
      .status(401)
      .json({ error: "Book already added, Plz add a new book 📖" });
  }

  await newBooks
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => res.status(500).json({ success: false, error: error })); //else save to the db
};

//get all books
exports.getBooks = async (req, res) => {
  await Books.find()
    .then((books) => res.json(books))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

//getting relevant book
exports.getBook = async (req, res) => {
  const { id } = req.params;

  await Books.findById(id)
    .then((books) => res.json(books))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

//deleting books
exports.deleteBooks = async (req, res) => {
  const { id } = req.params;

  await Books.findByIdAndDelete(id)
    .then(() => res.json({ message: "Successfully Deleted" }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

//updating book
exports.updateBooks = async (req, res) => {
  const { id } = req.params;

  const {
    bookName,
    author,
    bookDesc,
    bookCategory,
    addedDate,
    image,
    bookUrl,
  } = req.body;

  await Books.findByIdAndUpdate(id, {
    bookName,
    author,
    bookDesc,
    bookCategory,
    addedDate,
    image,
    bookUrl,
  })

    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, error: error }));
};

//updating like count
exports.updateLikes = async (req, res) => {
  const { id } = req.params;
  const likes = Number(req.body.likes) + 1;

  const likeCount = { likes };

  await Books.findByIdAndUpdate(id, likeCount)
    .then(() => {
      res.status(200).send({ status: "Likes Updated" });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ status: "Error with updating data", error: error.message });
    });
};

//updating download count
exports.updateDownloads = async (req, res) => {
  const { id } = req.params;
  const downloads = Number(req.body.downloads) + 1;

  const downloadCount = { downloads };

  await Books.findByIdAndUpdate(id, downloadCount)
    .then(() => {
      res.status(200).send({ status: "Downloads Updated" });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ status: "Error with updating data", error: error.message });
    });
};
