const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
var cors = require('cors')
const bodyparser = require('body-parser')
app.use(cors())


const User = require("./models/userSchema");

app.use(bodyparser.json())
app.use(express.json());

const uri =
  "mongodb+srv://zak:zinelabidine29225040@cluster0.5403ovo.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
    app.listen(port, () => {
      console.log(`server started at port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("hello");
});


app.get("/users", (req, res) => {
    User.find()
    .then((result) => {
        res.send(result);
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

app.post("/login", (req, res) => {
  console.log(req.body)
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        if (user.password === req.body.password) {
          res.send({ token: "qregbsrtberg" });
        } else {
          res.send("Invalid password");
        }
      } else {
        res.send("User not found");
      }
      }).catch((err) =>{
    console.log(err);
})});

app.post("/signup", (req, res) => {
  console.log(req.body);
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
