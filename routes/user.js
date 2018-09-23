const express = require('express');
const router = express.Router();
const { db, Page, User } = require('../models');
const userList = require('../views/userList');

router.get('/', async (req, res, next) => {
  console.log('ALL USER');
  try {
    const users = await User.findAll()
    res.send(userList(users))    
  } catch (err) {
    console.log('ERROR', err)
    next(err)
  }

});

router.get('/:id', async (req, res, next) => {
  console.log('in id', req.params.id);
  // console.log("ALL USER", await User.f())
});

router.post('/', async (req, res, next) => {
  console.log('in post');
  // console.log("ALL USER", await User.f())
  next();
});

router.put('/:id', async (req, res, next) => {
  console.log('in put id');
  // console.log("ALL USER", await User.f())
  next();
});

router.delete('/:id', async (req, res, next) => {
  console.log('in delete');
  // console.log("ALL USER", await User.f())
  next();
});

module.exports = router;
