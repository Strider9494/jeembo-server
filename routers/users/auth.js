const express = require('express');
const jwt = require('jsonwebtoken');
const User = require ('../../database/User');

const router = express.Router();

const secretKey = '106811';

router.post('/', async (req,res)=>{
  if (req.token) {
    await jwt.verify(req.token, secretKey, async (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const user = await User.findById(authData.userParams.id);
        const userParams = {
          name: user.name,
          email: user.email,
          id: user._id
        };
        jwt.sign ({userParams}, secretKey, {expiresIn: '24h'}, (err, token) =>{
          res.json({
            log: true,
            user: user,
            token
            });
        });
      }

    })
  }
})

module.exports = router;