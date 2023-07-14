const express = require('express');
const { isLoggedIn, isAdmin } = require('../middleware/route-guard.middleware')
const router = express.Router();

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

module.exports = router
