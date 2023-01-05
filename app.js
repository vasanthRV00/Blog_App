

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const { default: mongoose } = require("mongoose");

const _ = require('lodash');

const homeStartingContent = "Hey everyone, Welcome to my blog. I've created this blog using NodeJS, ExpressJS, and EJS. This site is styled using bootstrap and uses MongoDB with Mongoose as a database.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// const items = [];





const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Mongoose connection
mongoose.set('strictQuery', true); mongoose.connect('mongodb+srv://mongodb.net/blogDB');
const db = mongoose.connection;

//mongoose item schema

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

   
app.get("/", function (req, res) {

 Post.find({}, function(err, posts){
  res.render("home", {
    homeStarting:homeStartingContent,
   posts: posts,
  //  link:"http://localhost:3000/post/:topic"
  });



  
 });
 
});


app.get("/about", function (req, res) {
  res.render("about", {
    about:aboutContent
  });
});


app.get("/contact", function (req, res) {
  res.render("contact", {
    contact:contactContent
  });
});

app.get("/compose", function (req, res) 
  res.render("compose")
});

app.post("/compose", function(req,res){
  const post = new Post({
       title: req.body.titleInput,
       content: req.body.postInput
  });

post.save(function(err){
  if(!err){
    res.redirect("/");
  }
})
  
});


app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    });
  
  });
  

  let port = process.env.PORT;
  if (port == null || port == ""){
    port = 3000;
  }
  
  app.listen(port, function() {
    console.log("Server has been started, Shut up and go eat!");
  });
  


// compose content
// let item = req.body.textInput
// items.push(item);
// console.log(items);
// .trim(title).substring(0, 10).split(" ").slice(0, -1).join(" ") + "....."
