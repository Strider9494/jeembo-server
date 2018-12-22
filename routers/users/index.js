const express = require('express');
const registration = require('./registration');
const authentication = require('./authentication');


const router = express.Router();

// verifyToken = (req, res, next) => {
//   const bearer 
// };

router.use('/log', authentication);

router.use('/reg', registration );

module.exports = router;