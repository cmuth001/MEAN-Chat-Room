const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Inserting new post in to MongoDB
router.post('/api/posts', (req, res, next) => {
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
router.delete('/api/posts/:id', (req, res, next) => {
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
router.put('/api/posts/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
// console.log('put: ', );
  Post.updateOne({ _id: req.params.id}, post)
  .then( (result) => {
    console.log('updated: ', result);
    res.json({
      message: "Successfully Updated!",
      post: result,
    });
  });

});

// getting all the posts from mongoDB
router.use('/api/posts', (req, res, next)=>{
  Post.find()
  .then( (result) =>{
    res.status(200).json({
      message: 'posts sent successfully',
      posts: result,
    });
  })
  .catch();
});

module.exports = router;
