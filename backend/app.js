const express = require('express');
const app = express();
const  postRoutes = require('./routes/posts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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
app.use(postRoutes);
module.exports = app;
