const router = require('express').Router();
const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');


router.get('/', restricted, (req, res) => {
  const dept = req.decodedJwt.department;
  console.log("users-router.js decodedToken", req.decodedJwt)
  Users.find(dept)
    .then(users => {
      res.status(200).json(users);
    })
})


module.exports = router;