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

// POST-Route für die Filmdatensuche

// ...

// ...

// GET-Route für die Empfehlungsseite
router.get('/recommendation', (req, res) => {
  res.render('recommendation', { movies: [], errorMessage: null });
});

// POST-Route für die Filmdatensuche
router.post('/search', async (req, res, next) => {
  try {
    const { title, director, actors, genre, length, description } = req.body;
    
    // Überprüfen, ob mindestens ein Feld ausgefüllt ist
    if (!title && !director && !actors && !genre && !length && !description) {
      throw new Error('Bitte mindestens ein Feld ausfüllen!');
    }
    
    // Filter für die Suche erstellen
    const filter = {};
    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }
    if (director) {
      filter.director = { $regex: director, $options: 'i' };
    }
    if (actors) {
      filter.actors = { $regex: actors, $options: 'i' };
    }
    if (genre) {
      filter.genre = { $regex: genre, $options: 'i' };
    }
    if (length) {
      filter.length = length;
    }
    if (description) {
      filter.description = { $regex: description, $options: 'i' };
    }
    
    // Filme basierend auf dem Filter suchen
    const movies = await Movie.find(filter);
    
    res.render('recommendation', { movies, errorMessage: null });
  } catch (err) {
    res.render('recommendation', { movies: [], errorMessage: err.message });
  }
});

// ...




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

// *****  UPDATE ROUTES *****

router.get('/update-movie',/*isLoggedIn,*/ isAdmin, (req, res, next ) => {
  //added currentUser instead of user
 res.render('update-movie', { currentUser: req.session.currentUser })
})


// POST-Route zum Aktualisieren eines Films
router.post('/update-movie', async (req, res, next) => {
  try {
    const { search, title, director, actors, genre, length, description, image } = req.body;
    
    // Film suchen
    const movie = await Movie.findOneAndUpdate({ title: search }, {
      title,
      director,
      actors,
      genre,
      length,
      description,
      image
    });
    
    if (!movie) {
      throw new Error('Movie not found');
    }
    
    res.redirect('/update-movie');
  } catch (err) {
    res.redirect('/update-movie');
  }
});







module.exports = router
