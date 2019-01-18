const express = require('express');
const registration = require('./registration');
const authentication = require('./authentication');
const auth = require('./auth');
const posts = require('./posts');
const search = require('./search')

const router = express.Router();

verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined' ) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token= bearerToken;
      next();
    } else {
      res.sendStatus(403);
      }
 };

router.use('/auth', verifyToken, auth);

router.use('/log', authentication);

router.use('/reg', registration );

router.use('/posts', verifyToken, posts);

router.use('/search', verifyToken, search);

module.exports = router;