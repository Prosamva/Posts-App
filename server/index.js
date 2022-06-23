require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Post = require("./model/post");

const app = express();
app.use(cors());
app.listen(process.env.PORT);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(process.env.DB_URL);

console.log(`Server running on port ${process.env.PORT}...`);

app.get("/", function (req, res) {
  res.send({ message: "Hi from Posts app!" });
});

app.get("/posts/:id", function (req, res) {
  Post.findById(req.params.id, (error, post)=>{
    if (error) res.status(422).send({ error: "Unable to fetch post!" });
    else res.status(200).send(post);
  });
});

app.get("/posts", function (req, res) {
  const title = req.query.title;
  const author = req.query.author;
  var filter = {};
  if (title != null) filter["title"] = title;
  if (author != null) filter["author"] = author;
  Post.find(filter, null, { sort: "-date" }, (error, post)=>{
    if (error) res.status(500).send({ error: "Unable to fetch post(s)!" });
    else res.status(200).send(post);
  });
});

app.post("/posts", function (req, res) {
  const data = req.body;
  const post = new Post();
  post.title = data.title;
  post.author = data.author;
  post.content = data.content;
  post.save( (error, savedPost)=>{
    if (error) res.status(500).send({ error: "Unable to save Post!" });
    else res.status(200).send(savedPost);
  });
});

app.put("/posts/:id", function (req, res) {
  const data = req.body;
  data.date = Date.now();
  Post.findByIdAndUpdate(req.params.id, data, (error, oldPost)=>{
    if (error) res.status(422).send({ error: "Update unsucessful!" });
    else res.status(200).send({ beforeUpdate: oldPost });
  });
});

app.delete("/posts/:id", function (req, res) {
  Post.findByIdAndDelete(req.params.id,(error, post)=>{
    if (error) res.status(422).send({ error: "Delete unsuccessful!" });
    else res.status(200).send({ deleted: post });
  });
});
