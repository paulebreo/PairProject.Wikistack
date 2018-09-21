const express = require('express');
const router = express.Router();
const { db, Page, User } = require('../models');
const addPage = require('../views/addPage');

router.get('/', async (req, res, next) => {
  console.log('ALL POSTS', await Page.findAll());
});

router.post('/', async (req, res, next) => {
  console.log('ADD A NEW POST');
  // serialize the body from

  // User.create()

  // redirect if succes ? send a http 201
  //  redirect if error ? send ??
  next();
});

router.get('/add', async (req, res, next) => {
  // console.log('SERVE ADD FORM');

  res.send(addPage());
});

module.exports = router;
