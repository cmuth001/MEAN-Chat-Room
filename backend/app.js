const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');
mongoose.connect("mongodb+srv://cmuth001:uIQc0vhkYeHTbzkI@chat-room-eqvp3.mongodb.net/chat-room?retryWrites=true&w=majority", { useNewUrlParser: true })
.then( () => {
  console.log("Database connected!");
})
.catch( () => {
  console.log('Failed in connecting!');
});
// uIQc0vhkYeHTbzkI
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});
// Inserting new post in to MongoDB
app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  // const post = req.body;
  post.save()
  .then(result => {
    console.log("createdPost: " + result);
    res.status(201).json({
      message: 'post added in to server',
      postId: result._id,
    });
  });
  // console.log(post);

});
// Deleting a requested post from MongoDB
app.delete('/api/posts/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('id:', id);
  Post.deleteOne( { _id: id } )
  .then(result => {
    console.log(result);
  });
  res.status(200).json({
    message: 'message successfully deleted!',
  });
});

// getting all the posts from mongoDB
app.use('/api/posts', (req, res, next)=>{
  Post.find()
  .then( (result) =>{
    res.status(200).json({
      message: 'posts sent successfully',
      posts: result,
    });
  })
  .catch();
});

module.exports = app;
