const { findOneAndDelete } = require("../models/tasksModel");
const Task = require("../models/tasksModel");

exports.insertTasks = (req, res) => {
  let temp = new Date(req.body.due_date);
  console.log("rrrrrrr", req.body, temp.toDateString());
  Task.create(req.body)
    .then(() => {
      res.status(200).json({
        Success: "Task added succcessfully in db",
      });
    })
    .catch((err) => {
      console.log("error in inserting new data ", err);
      res.status(400).json({
        error: `Data insertion failed ${err}`,
      });
    });
};

exports.deleteTasks = async (req, res) => {
  try {
    console.log("222", req.body);
    const delteTask = await Task.findOneAndDelete({
      user_id: req.body.user_id,
      _id: req.body.task_id,
    });
    res.status(200).json({
      error: `Data deleted `,
    });
  } catch (err) {
    res.status(400).json({
      error: `Data DELETION failed ${err}`,
    });
  }
};

exports.editTasks = async (req, res) => {
  try {
    console.log("edit", req.body);
    const update = await Task.findOneAndUpdate(
      {
        // user_id : req.body.user_id ,
        _id: req.body.task_id,
      },
      {
        $set: {
          task: req.body.new_task,
          description: req.body.description,
          due_date: req.body.due_date,
        },
      },
      { upsert: true, new: true, runValidators: true },
    );

    console.log(update);

    res.status(200).json({
      message: "updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: `Data updation failed ${err}`,
    });
  }
};

exports.getTasks = (req, res) => {
  Task.find({ user_id: req.body.user_id }).exec((err, task) => {
    if (err) {
      res.status(400).json({
        error: "Tasks not found in db",
      });
    }
    res.status(200).json({
      task,
    });
  });
};
