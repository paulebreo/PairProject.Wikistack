const express = require('express');
const router = express.Router();
const { db, Page, User } = require('../models');
const views = require('../views')
const addPage = require('../views/addPage');


router.use(express.urlencoded({ extended: false }));

router.get('/', async (req, res, next) => {
  // console.log('ALL POSTS', await Page.findAll());

    try {
      console.log('ALL PAGES');
      const pages = await Page.findAll()
      console.log('PAGES', pages)
      res.send(views.main(pages)) 
      // console.log('FOUND PAGE', page)
      next();
    }
    catch (error){
      next(error);
    }

  next();
});


router.post('/', async (req, res, next) => {
  let user 
  let wasCreated 
  let page
  try {
    [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    })
  } catch (err) {
    console.log('ERROR', err)
  }

  try {
    page = new Page({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    })
    page.setAuthor(user)
  } catch (err) {
    console.log('ERROR', err)
  }

  // make sure we only redirect *after* our save is complete!
  try {
    let newPage = await page.save();
    console.log('PAGE INSTANCE', newPage)
    res.redirect(`/wiki/${newPage.slug}`);
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
  try {
    console.log('CERTAIN PAGE', req.params.slug);

    const page = await Page.findOne({
      where: {slug: req.params.slug}
    })
    const author = await page.getAuthor()
    console.log('author', author)
    res.send(views.wikiPage(page, author))

  }
  catch (error){
    next(error);
  }

});

module.exports = router;
