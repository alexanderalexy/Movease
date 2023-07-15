const express = require('express');
const { isLoggedIn, isAdmin } = require('../middleware/route-guard.middleware')
const router = express.Router();
const Movie = require('../models/Movie.model')
/* GET home page */
router.get("/", (req, res, next) => {

  console.log(req.session)
  res.render("index")
});

// GET search page

router.get('/search',isLoggedIn, /*isAdmin,*/ (req, res, next ) => {
  //added currentUser instead of user
  res.render('search', { currentUser: req.session.currentUser })
})


//GET to add a new movie only with admin rights

router.get('/add-movie',/*isLoggedIn,*/ isAdmin, (req, res, next ) => {
  //added currentUser instead of user
 res.render('add-movie', { currentUser: req.session.currentUser })
})

// POST route to add a new movie in the DB
/*
router.post('/add-movie', (req, res, next) => {
  const { title, director, actors, genre, description, length, image } = req.body
  
  Movie.create({ title, director, actors, genre, description, length, image  })
  .then( () => res.redirect('/add-movie'))
  .catch( (err) => res.render('search'));
})
*/

router.post('/add-movie', async (req, res, next) => {
  try {
    const { title, director, actors, genre, description, length, image } = req.body;
    console.log(req.body)
    const addMovie = await Movie.create({ title, director, actors, genre, description, length, image });
    console.log(addMovie)
    res.redirect('/add-movie');
  } catch (err) {
    console.log(err)
    res.render('add-movie');
  }
});

// ***** (D)ELETE ROUTES *****

//GET to delete a movie only with admin rights

router.get('/delete-movie',/*isLoggedIn,*/ isAdmin, (req, res, next ) => {
  //added currentUser instead of user
 res.render('delete-movie', { currentUser: req.session.currentUser })
})

// POST-Route zum Löschen eines Films
router.post('/delete-movie', async (req, res, next) => {
  try {
    const { movieId } = req.body;
    
    const deleteMovie = await Movie.findByIdAndDelete(movieId);
    
    res.redirect('/delete-movie');
  } catch (err) {
    next(err);
  }
});






module.exports = router
