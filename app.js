require("dotenv").config()
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors= require("cors");
const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/user");
const bodyparser = require("body-parser");



mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(console.log("DB Connected")).catch((err)=>{console.log("cannot connect MongoDB due to :- ",err)})

app.use(bodyparser.json());
app.use(cors());

app.use(taskRoutes);
app.use(userRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`app is running at http://localhost:${process.env.PORT}`)
});

