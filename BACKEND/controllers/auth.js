const User = require("../models/auth");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//when we use asynchronous function we need try catch block
exports.register = async (req, res) => {
  //controller for register
  const { username, email, password } = req.body; //destructure method

  try {
    const user = await User.create({
      username,
      email,
      password, //this.password filed of user.js in models
    });
    sendToken(user, 200, res);
  } catch (error) {
    if (error.code === 11000) {
      const message = "Already have an account using this email";
      return res.status(400).json({ success: false, error: message });
    }

    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: message });
    }
  }
};

exports.login = async (req, res) => {
  //controller for login
  const { email, password } = req.body;

  if (!email || !password) {
    //backend validation
    return res
      .status(400)
      .json({ success: false, error: "Please enter email and password" });
  } //bad request

  try {
    const user = await User.findOne({ email }).select("+password"); //match two passwords

    if (!user) {
      //true
      return res.status(401).json({
        success: false,
        available: "User does not exist, Please create an account first",
      });
    }

    const isMatch = await user.matchPasswords(password); //matching the passwords from the received from request and from the db

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid Credentials" });
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      //500 Internal server error
      success: false,
      error: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  await User.find()
    .then((user) => res.json(user))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

exports.getUser = async (req, res) => {
  const { id } = req.params;

  await User.findById(id)
    .then((user) => res.json(user))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

exports.editUser = async (req, res) => {
  const { id } = req.params;

  const { username, email } = req.body;

  await User.findByIdAndUpdate(id, {
    username,
    email,
  })
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, error: error }));
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id)
    .then(() => res.json({ message: "Successfully Deleted" }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

exports.forgotpassword = async (req, res) => {
  //controller for forgot password
  const { email } = req.body;

  try {
    const user = await User.findOne({ email }); //check for email availability for sending emails

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Email could not be sent" });
    }

    const resetToken = user.getResetPasswordToken(); // get the password reset token

    await user.save();

    const resetURL = `localhost:3000/passwordreset/${resetToken}`; //setting a URL to send to the user for emails

    const message = `
          <h1>You have requested a password reset</h1>
          <p>Please go to this URL to reset password</p>
          <a href=${resetURL} clicktracking=off>${resetURL}</a>
           `;
    try {
      await sendEmail({
        //send email
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, verify: "Email Sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return res
        .status(500)
        .json({ success: false, error: "Email could not be sent" });
    }
  } catch (error) {
    next(error);
  }
};

exports.resetpassword = async (req, res) => {
  //controller for reset password
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex"); //create a hash code using crypto

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }, //find and update the relavant database field
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Reset Token" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ success: true, verify: "Password reset success" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: message });
    }
  }
};

//when we use asynchronous function we need try catch block
exports.registerStaff = async (req, res) => {
  //controller for register
  const { username, email, password, type } = req.body; //destructur e method

  try {
    const user = await User.create({
      username,
      email,
      password,
      type, //this.password filed of user.js in models
    });
    sendToken(user, 200, res);
  } catch (error) {
    if (error.code === 11000) {
      const message = "Already have an account using this email ";
      return res.status(400).json({ success: false, error: message });
    }

    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: message });
    }
  }
};

const sendToken = (user, statusCode, res) => {
  //JWT get
  const token = user.getSignedToken();
  const username = user.username;
  const email = user.email;
  const type = user.type;
  const id = user._id;
  res.status(200).json({ success: true, token, username, email, type, id });
};
