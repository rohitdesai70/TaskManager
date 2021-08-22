const mongoose = require("mongoose");
const{ObjectId}= mongoose.Schema;


const taskSchema = new mongoose.Schema(
    {
      task: {
        type: String,
        trim: true,
        required: true
      },
      description: {
        type: String,
        trim: true,
        required: true
      },
      due_date:{
        type: Date,
        required: true
      },
    
      user_id: {
        type: ObjectId,
        ref: "User"
      }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Task", taskSchema);