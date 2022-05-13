const router = require("express").Router();

const { register, login, forgotpassword, resetpassword, registerStaff } = require("../controllers/auth");

//below routes map the controllers
router.route("/register").post(register); //call the auth in controllers

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/passwordreset/:resetToken").put(resetpassword);

router.route("/registerStaff").post(registerStaff);

module.exports = router;