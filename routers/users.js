const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require ('../database');


const router = express.Router();
const salt = bcrypt.genSaltSync(10);

router.use(express.json());

// verifyToken = (req, res, next) => {
//   const bearer 
// };


router.post('/log', async (req, res) => {
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

  if(user && bcrypt.compareSync(req.body.password, user.password)) {
    const userParams = {
      name: user.name,
      email: user.email,
      id: user._id
    };
  
    jwt.sign ({userParams}, 'seсretkey', {expiresIn: '24h'}, (err, token) =>{
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

router.post('/reg', async (req, res) => {
  console.log(req.body);
  const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().min(3).required()
  }

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return
  }
  const user = await User.findOne({ name: req.body.name});
  const email = await User.findOne({ email: req.body.email});
  if (user) return res.status(400).json({reg: false, reason: "nameBusy"});
  if (email) return res.status(400).json({reg: false, reason: "emailBusy"});
  
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt)
  });

  await newUser.save((err, newUser) => {
    if(err) console.error(err);
  });

  res.json({reg: true});

});

module.exports = router;