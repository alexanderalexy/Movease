// routes/movies.routes.js

const express = require('express');
const { isLoggedIn, isAdmin } = require('../middleware/route-guard.middleware')
const router = express.Router();


/*

// POST route to create a new movie in db only by admin

router.get('/add-movie', isAdmin, async (req, res, next) => {

    try {
      const allCelebrities = await movie.find();
      res.render('add-movie');
    } catch (err) {
      next(err);
    }
  });
  

//GET search page

router.get('/add-movie',isLoggedIn, /*isAdmin*/ //(req, res, next ) => {
    //added currentUser instead of user
 //  res.render('add-movie', { currentUser: req.session.currentUser })
 // })


// module.exports = router
