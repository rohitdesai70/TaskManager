var express = require("express");
var router = express.Router();
const {insertTasks,editTasks,deleteTasks,getTasks}= require("../controllers/taskController");
const {isSigned}= require("../controllers/authController");

router.get("/test",(req,res)=>{
    res.send("WORKING")
});




router.post("/insert-tasks",isSigned,insertTasks)
router.post("/edit-tasks",isSigned,editTasks)

router.post("/delete-tasks",isSigned,deleteTasks)
router.post("/get-tasks",isSigned,getTasks)


module.exports=router;