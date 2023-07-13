const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/search', (req, res ) => {
  console.log('here is the session from the search route', req.session)
  res.render('search');
});

module.exports = router;
