const express = require('express');
const route = express.Router();
const Post = require('../models/postModel');
const verify = require('../middleware/verify');

// route.get('/', verify, async (req, res) => {
//     try {
//         const posts = await Post.findAll();
//         res.send(posts);
//     } catch (err) {
//         res.send("Something went wrong");
//     }
// });

route.post("/",verify, async (req,res) =>{
    try{
        const newPost = await Post.create({
            title: req.body.title,
            body: req.body.body,
            headerIMG: req.body.headerIMG,
        });
        res.send(newPost);
    }
    catch(err){
        res.send("something went wrong");
    }
    
});

// route.patch("/:id", verify, async (req,res)=>{
//     try{
//         const post = await Post.findByPk(req.params.id);
//         post.title= req.body.title;
//         post.body= req.body.body;
//         post.headerIMG= req.body.headerIMG;
//         await post.save();
//         res.send(post);
//     }
//     catch(err){
//         res.send("something went wrong");
//     }
    
// });

// route.delete("/:id",verify, async (req,res)=>{
//     try{
//         const post = await Post.findByPk(req.params.id);
//         await post.destroy();
//         res.send(post);
//     }
//     catch(err){
//         res.send("something went wrong");
//     }
    
// });

module.exports = route;