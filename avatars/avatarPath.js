const Jimp = require("jimp");

const isImageAndTransform = async (filePath) => {
  try {
    const image = await Jimp.read(filePath);
    await image.resize(250, 250);
    await image.write(filePath);
    return true;
  } catch (error) {
    console.error("Error processing image:", error);
    return false;
  }
};

module.exports = { isImageAndTransform };
