const express = require('express');
const jwt = require('jsonwebtoken');
const Post = require('../../database/Post');
const User = require('../../database/User');

const router = express.Router();

const secretKey = '106811';

router.post('/', async (req,res)=>{
  if (req.token) {
    await jwt.verify(req.token, secretKey, async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const newPost = new Post({
          userId: authData.userParams.id,
          title: req.body.title,
          body: req.body.body
        })
        await newPost.save((err, newPost) => {
          if(err) console.error(err);
          if(newPost) console.log(newPost);
        });
        await User.findById(newPost.userId, (err, user)=>{
          if (err) return console.error(err);
          user.posts.push(newPost.id);
          user.save((err,user)=>{
            if(err) console.error(err);
            if(user) console.log(user);
          })
        })
        res.send(newPost);
      }
    })
  }
});

router.get('/', async(req,res)=>{
  if (req.token) {
    await jwt.verify(req.token, secretKey, async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const user= await User.findOne({name:authData.userParams.name}, (err, user) => {
          if (err) return console.error(err);
        });
        
        const posts = await Post.find({userId:user.id}, (err, posts) => {
            if (err) return console.error(err);
        });
        res.json(posts);
      }
    })
  }
})

router.delete('/', async(req,res)=>{
  if (req.token) {
    await jwt.verify(req.token, secretKey, async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const user= await User.findOne({name:authData.userParams.name},(err, user) => {
          if (err) return console.error(err);
        });
        const postIndex = user.posts.indexOf(req.headers.postid);
        if (postIndex < 0) {
          res.sendStatus(404);
        }
        user.posts.splice(postIndex,1);
        await user.save((err,user)=>{
          if(err) console.error(err);
        })
        await Post.deleteOne({_id:req.headers.postid});
      res.status(200).json({deletedPost: req.headers.postid});        
      }

    })
  }
})


module.exports = router;