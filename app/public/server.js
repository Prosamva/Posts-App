const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const Post = require("./models/post");

const app = express();
const dbLink =
  "mongodb+srv://Gerulf789:3YvfvABUqE8mb9P@cluster0.6h3ar.mongodb.net/GEOGO-FSWDI-A5-DB?retryWrites=true&w=majority";
const db = mongoose.connect(dbLink);

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: '*',
  maxAge: 86400,
  preflightContinue: true,
  credentials: true,
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/", function (req, res) {
  res.send({ student: "Samuel Vasamsetti", team: "Kalam" });
});

app.get("/posts/:id", function (req, res) {
  Post.findById(req.params.id, function (error, post) {
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
  Post.find(filter, null, { sort: "-date" }, function (error, post) {
    if (error) res.status(500).send({ error: "Unable to fetch post(s)!" });
    else res.status(200).send(post);
  });
});

app.post("/posts", function (req, res) {
  var data = req.body;
  var post = new Post();
  post.title = data.title;
  post.author = data.author;
  post.content = data.content;
  post.save(function (error, savedPost) {
    if (error) res.status(500).send({ error: "Unable to save Post!" });
    else res.status(200).send(savedPost);
  });
});

app.put("/posts/:id", function (req, res) {
  var data = req.body;
  data.date = Date.now();
  Post.findByIdAndUpdate(req.params.id, data, function (error, oldPost) {
    if (error) res.status(422).send({ error: "Update unsucessful!" });
    else res.status(200).send({ beforeUpdate: oldPost });
  });
});

app.delete("/posts/:id", function (req, res) {
  Post.findByIdAndDelete(req.params.id, function (error, post) {
    if (error) res.status(422).send({ error: "Delete unsuccessful!" });
    else res.status(200).send({ deleted: post });
  });
});

app.listen(port, function () {
  console.log("Server is running...");
});