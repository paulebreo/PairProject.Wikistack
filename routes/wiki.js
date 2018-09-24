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
  let page
  try {
    console.log('CERTAIN PAGE', req.params.slug);    
    page = await Page.findOne({
      where: {slug: req.params.slug}
    })
    if(!page) {
      res.status(404).end('page not found')
    }
  } catch (error) {
    console.log('ERROR', error)
  }
  try {
    const author = await page.getAuthor()
    res.send(views.wikiPage(page, author))
  } catch (error) {
    next(error);
  }

});

router.get('/:slug/edit', async (req, res, next) => {
  let page
  try {
    console.log('EDIT PAGE', req.params.slug);    
    page = await Page.findOne({
      where: {slug: req.params.slug}
    })
    if(!page) {
      res.status(404).end('page not found')
    }
  } catch (error) {
    console.log('ERROR', error)
  }
  try {
    const author = await page.getAuthor()
    res.send(views.editPage(page, author))
  } catch (error) {
    next(error);
  }

});

router.post('/:slug', async (req, res, next) => {
  console.log('POSTING SLUG')
  try {
    const [numberOfAffectedRows, affectedRows] = await Page.update({ 
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    }, {
      where: {slug: req.params.slug},
      returning: true, // needed for affectedRows to be populated
      plain: true // makes sure that the returned instances are just plain objects
    })
    res.status(201).redirect(`/wiki/${req.params.slug}`);
  } catch (error) {
    console.log('ERROR', error)
    next(error)
  }
});

// On the front end, you might have to create a form DELETE request
router.delete('/:slug/delete', async (req, res, next) => {
  console.log('DELETING SLueUG')
  // not sure why this is not redirecting
  res.status(201).redirect(`/wikieu/`);
  res.status(200).end()
});



module.exports = router;
