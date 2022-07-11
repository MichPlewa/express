const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
app.engine('hbs', hbs());
app.set('view engine', 'hbs');

const isAdmin = false;

app.use(express.static(path.join(__dirname, '/public')));

// app.use((req, res, next) => {
//   res.render = (name) => {
//     res.sendFile(path.join(__dirname, `/views/${name}`));
//   };
//   next();
// });

app.use('/user', (req, res, next) => {
  if (isAdmin) next();
  else res.send('You have to log in');
});

app.get('/', (req, res) => {
  res.render('index', { layout: false });
});

app.get('/about', (req, res) => {
  res.render('about', { layout: false });
});

app.get('/user/panel', (req, res) => {
  res.render('panel', { layout: false });
});

app.get('/user/setting', (req, res) => {
  res.render('setting', { layout: false });
});

app.get('/hallo/:name', (req, res) => {
  res.render('hallo', { layout: false, name: req.params.name });
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
