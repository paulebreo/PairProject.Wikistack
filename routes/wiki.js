const express = require('express');
const router = express.Router();
const { db, Page, User } = require('../models');
const addPage = require('../views/addPage');

router.use(express.urlencoded({ extended: false }));

router.get('/', async (req, res, next) => {
  console.log('ALL POSTS', await Page.findAll());
  next();
});

router.post('/', async (req, res, next) => {
  console.log('ADD A NEW POST');

  console.log('FORM DATA', req.body);

  // User.create()
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    slug: 'abc',
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }

  // redirect if succes ? send a http 201
  //  redirect if error ? send ??
  next();
});

router.get('/add', async (req, res, next) => {
  console.log('SERVE ADD FORM');

  res.send(addPage());
});

module.exports = router;
