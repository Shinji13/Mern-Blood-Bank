import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "C:/Users/hp/Documents/study/OwnStudy/Projects/BloodBank/Server/images"
    );
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage });
