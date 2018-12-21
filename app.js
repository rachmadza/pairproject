const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');

const home = require('./routes/home');
const menu = require('./routes/menu');

// app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'user' }));



app.use('/', home);
app.use('/menu', function(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/')
  }
}, menu);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});