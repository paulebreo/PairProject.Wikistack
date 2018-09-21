const express = require('express');
const router = express.Router();
const {db, Page, User} = require('../models');

router.get('/', async (req, res, next) => {
    console.log("ALL USER", await User.findAll())

})


module.exports = router
