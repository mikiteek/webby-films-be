const multer = require("multer");
const path = require("path");

const fileNameGenerator = (req, file, cb) => {
  const ext = path.parse(file.originalname).ext;
  cb(null, Date.now() + ext);
}

const storage  = multer.diskStorage({
  destination: "uploadedFilmsData",
  filename: fileNameGenerator,
});

const uploadImageMiddleware = multer({storage});

module.exports = uploadImageMiddleware;