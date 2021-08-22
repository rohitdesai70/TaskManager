const User = require("../models/usersModel");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");


exports.insertUser=(req,res)=>{
    
    console.log("eeeee",req.body);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }


    User.create(req.body).then(()=>{
        res.status(200).json({
            Success:"User added succcessfully in db"
        })
    }).catch((err)=>{
        console.log("error in inserting new data ",err)
        res.status(400).json({
            error:`Data insertion failed`
        })
    })
};


exports.signin = (req, res) => {
    const { email, password } = req.body;
  
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }
  
    console.log( email)
    User.findOne({ email }, (err, user) => {
        console.log("ppppp",err,user)
      if (err && !user) {
      console.log(2222)
        returnres.status(400).json({
          error: "USER email does not exists"
        });
      }
      
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password do not match"
        });
      }
  
      //create token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);
      //put token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });
  
      //send response to front end
      const { _id, name, email, role } = user;
      return res.json({ token, user: { _id, name, email, role } });
    });
  };


  exports.isSigned= expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth"
    
    });

    
    exports.signout = (req, res) => {
        res.clearCookie("token") 
       res.json({
         message: "User signed out"
       });
     };