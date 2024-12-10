const User = require("../models/schemaUser");
const { emailSender } = require("./email");

const verifyUser = async (req, res, next) => {
  const verToken = req.params.verificationToken;

  try {
    const user = await User.findOne({ verificationToken: verToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      await User.updateOne(
        { verificationToken: verToken },
        { verificationToken: null, verify: true }
      );
      return res.status(200).json({ message: "Verification successful" });
    }
  } catch (error) {
    next(error);
  }
};

const resendingVerifyEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Missing required field email" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }
    await emailSender(
      user.email,
      "Verify email",
      `<h3>Hello!</h3><br><p>Please vrify your email.</p><a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click here</a>`
    );
    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyUser, resendingVerifyEmail };
