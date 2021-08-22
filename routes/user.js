var express = require("express");
var router = express.Router();
const {insertUser,signin,signout}= require("../controllers/authController");



router.post("/insert-user",insertUser)
router.post("/sign-in",signin)
router.post("/sign-OUT",signout)

module.exports=router;