const express = require('express');
const router = express.Router();
const { db, Page, User } = require('../models');
const views = require('../views')
const addPage = require('../views/addPage');



router.use(express.urlencoded({ extended: false }));

router.get('/', async (req, res, next) => {
  console.log('ALL POSTS', await Page.findAll());
  next();
});




router.post('/', async (req, res, next) => {
  // console.log('ADD A NEW POST');

  // console.log('FORM DATA', req.body);

  // User.create()
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    let newPage = await page.save();
    console.log('PAGE INSTANCE', newPage)
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

router.get('/:slug', async (req, res, next) => {
  try{
    console.log('CERTAIN PAGE', req.params.slug);

    const page = await Page.findOne({
    where: {slug: req.params.slug}
    })
     ;
     res.send(views.wikiPage(page, "sampleAuthor"))
    // console.log('FOUND PAGE', page)
    next();
  }
  catch (error){
    next(error);
  }

});

module.exports = router;
