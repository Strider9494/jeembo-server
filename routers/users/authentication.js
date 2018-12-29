const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require ('../../database');

const secretKey = '106811';

const router = express.Router();

router.post('/', async (req, res) => {
  const schema = {
    name: Joi.string().min(4).required(),
    password: Joi.string().min(4).required()
  }

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(502).send(result.error.details[0].message);
    return
  }

  const user = await User.findOne({ name: req.body.name});
  console.log(user);

  if(user && bcrypt.compareSync(req.body.password, user.password)) {
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

  } else {
    return res.status(403).json({ log:false, reason:'Invalid login or password' });
  }
});

module.exports = router;
