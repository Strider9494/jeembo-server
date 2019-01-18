const express = require('express');
const jwt = require('jsonwebtoken');
const Post = require('../../database/Post');
const User = require('../../database/User');

const router = express.Router();

const secretKey = '106811';

router.get('/', async (req,res)=>{
  if (req.token) {
    await jwt.verify(req.token, secretKey,(err, authData) => {
      if (err) {
        res.sendStatus(403);
      }
    })
        console.log(req.headers.searchuser);
        const searchUser= await User.findOne({name:req.headers.searchuser},(err, user) => {
          if (err) return console.error(err);
        });
        console.log(searchUser);
          
        if (searchUser) {
          const userData = {
            name:searchUser.name,
            email: searchUser.email,
            avatar: searchUser.avatar
          }
          return res.json({search: true, searchUser : userData});
        }
        console.log("1");
        return res.status(404).json({search: false});
    
  }
})

module.exports = router;