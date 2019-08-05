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
  next();
});
app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  // const post = req.body;
  post.save();
  // console.log(post);
  res.status(201).json({
    message: 'post added in to server',
  });
});
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
