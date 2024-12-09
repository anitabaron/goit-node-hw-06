const multer = require("multer");
const path = require("path");
const { v4: uuidV4 } = require("uuid");

const tempDir = path.join(process.cwd(), "temp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidV4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
  limits: {
    fileSize: 1048576,
  },
});

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeWhiteList = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

const uploadAvatarMiddleware = multer({
  storage,
  fileFilter: async (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype.toLowerCase();
    if (
      !extensionWhiteList.includes(extension) ||
      !mimetypeWhiteList.includes(mimetype)
    ) {
      return cb(
        new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."),
        false
      );
    }
    return cb(null, true);
  },
  limits: { fileSize: 1024 * 1024 * 5 },
});

module.exports = { uploadAvatarMiddleware };
