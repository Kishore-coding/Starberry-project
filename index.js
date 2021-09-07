const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server started"));

//setup mondodb

mongoose.connect(
  "mongodb+srv://my-db:kishore@kishore-cluster.7ecx8.mongodb.net/starberry-db?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Mongodb connected");
  }
);
//router setup
app.use("/users", require("./routes/userRoutes"));
