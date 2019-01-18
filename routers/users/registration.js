const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const User = require ('../../database/User');

const router = express.Router();
const salt = bcrypt.genSaltSync(10);

router.post('/', async (req, res) => {
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