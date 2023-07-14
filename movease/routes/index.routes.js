const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {

  console.log(req.session)
  res.render("index");
});

router.get('/search', (req, res, next ) => {
  console.log('here is the session from the search route', req.session)
  //added currentUser instead of user
  res.render('search', { currentUser: req.session.currentUser });
});

module.exports = router;
