const fs = require("fs").promises;
const path = require("path");
const { v4: uuidV4 } = require("uuid");
const User = require("../models/schemaUser");
const { isImageAndTransform } = require("./avatarPath");

const storeImageDir = path.join(process.cwd(), "public/avatars");

const processImage = async (req, res, next) => {
  const avatarFile = req.file;
  if (!avatarFile) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const { path: temporaryPath } = req.file;
  const extension = path.extname(temporaryPath);
  const fileName = `${uuidV4()}${extension}`;
  const filePath = path.join(storeImageDir, fileName);

  console.log("Temporary path:", temporaryPath);
  console.log("File path:", filePath);
  try {
    await fs.rename(temporaryPath, filePath);
    console.log("File moved successfully");
  } catch (error) {
    console.error("Error renaming file:", error);
    await fs.unlink(temporaryPath);
    return next(error);
  }

  const isValidAndTransform = await isImageAndTransform(filePath);
  if (!isValidAndTransform) {
    await fs.unlink(filePath);
    return res.status(400).json({ message: "File isn't a photo." });
  }
  const userId = await User.findById(req.user._id);
  const avatarURL = `/avatars/${fileName}`;
  await User.findOneAndUpdate(userId, { avatarURL });
  res.status(200).json({ message: `avatarURL: ${avatarURL}` });
};

module.exports = { processImage };
