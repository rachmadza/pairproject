const router = require('express').Router();
const db = require('../models');
const crypto = require('crypto');


router.get('/', (req, res) => {
  res.render('home')
});

router.get('/signup', (req, res) => {
  res.render('signup')
});

router.post('/signup', (req, res) => {
  db.User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  })

    .then((result) => {
      res.redirect('/');
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/login', (req, res) => {
  res.render('login');
})

router.post('/login', (req, res) => {

  db.User.findOne({
    where: {
      email: req.body.email
    }
  })

    .then((result) => {
      // res.send(result.secret)

      if (!result) {
        res.send('ERROR')
      } else {
        const hash = crypto.createHmac('sha256', result.secret)
          .update(req.body.password)
          .digest('hex');

        if (hash === result.password) {

          req.session.user = {
            email: result.email,
            role: result.role
          }
          res.redirect('/menu');
        } else {
          res.redirect('/login');
        }

      }
    })
    .catch((err) => {
      res.send(err);
    });

});


module.exports = router;