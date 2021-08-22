const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");



const usersSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
      },
      lastname: {
        type: String,
        maxlength: 32,
        trim: true
      },
      email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
      },
       mobile: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 10,
      },
       encry_password: {
        type: String,
        required: true
      },
      salt: String,
    },
    { timestamps: true }
  );
  

  usersSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv4();
    // console.log("coming",password,this.securePassword(password));
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

  usersSchema.methods = {
  authenticate: function(plainpassword) {
    console.log("qqqqqqq",this.securePassword(plainpassword))

    console.log("wwwwwwwwwwwwwww",this.encry_password)
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      console.log(9999,err);
      return "";
    }
  }
};

module.exports = mongoose.model("Users", usersSchema);
