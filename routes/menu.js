const router = require('express').Router();
const db = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op

router.get('/', (req, res) => {
  // res.send(req.session)
  db.Job.findAll()

    .then((result) => {
      // res.send(result)
      res.render('menu', { data: req.session.user, jobs: result });
    }).catch((err) => {
      res.send(err);
    });

});

router.get('/job/add', (req, res) => {

  db.Company.findOne({
    where: {
      email: req.session.user.email
    }
  })

    .then((result) => {
      if (result) {

        res.render('company', { data: result });
      } else {
        res.send('ERR')
      }
    })
    .catch((err) => {
      res.send(err);
    });

});

router.post('/job/add', (req, res) => {

  db.Job.create({
    name: req.body.name,
    category: req.body.category,
    requirement: req.body.requirement,
    CompanyId: req.body.fk
  })

    .then(() => {
      res.redirect('/menu')
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/job/edit/:id', (req, res) => {

  db.Job.findOne({
    where: {
      id: req.params.id
    }
  })

    .then((result) => {
      // res.send(result)
      res.render('edit', { data: result });
    }).catch((err) => {
      res.send(err);
    });

});

router.post('/job/edit/:id', (req, res) => {

  db.Job.update({
    name: req.body.name,
    category: req.body.category,
    requirement: req.body.requirement,
    CompanyId: req.body.fk
  }, {
      where: {
        id: req.params.id
      }
    })

    .then(() => {
      res.redirect('/menu')
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/job/delete/:id', (req, res) => {
  db.Job.destroy({
    where: {
      id: req.params.id
    }
  })

    .then(() => {
      res.redirect('/menu')
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get('/search', (req, res) => {
  // res.send(req.query)
  db.Job.findAll({
    where: {
      name: { [Op.iLike]: `%${req.query.name}%` }
    }
  })


    .then((result) => {
      // res.send(result)
      res.render('search', { data: result });
    }).catch((err) => {
      res.send(err);
    });

});

router.get('/apply/:id', (req, res) => {

  res.render('apply')
});

module.exports = router;