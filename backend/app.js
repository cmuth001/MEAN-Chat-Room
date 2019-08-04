const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'post added in to server',
  });
});
app.use('/api/posts', (req, res, next)=>{
  const posts = [
    {id: 'aasdfghjkl1', title: 'title1', content: 'this is my content1'},
    {id: 'aasdfghjkl1', title: 'title2', content: 'this is my content2'},
    {id: 'aasdfghjkl1', title: 'title3', content: 'this is my content3'},];
  res.status(200).json({
    message: 'posts sent successfully',
    posts: posts,
  });
});
module.exports = app;
