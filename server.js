const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
app.engine('hbs', hbs());
app.set('view engine', 'hbs');

const isAdmin = false;

app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/view/${name}`));
  };
  next();
});

app.use('/user', (req, res, next) => {
  if (isAdmin) next();
  else res.send('You have to log in');
});

app.get('/', (req, res) => {
  res.show('index.html');
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

app.get('/hallo/:name', (req, res) => {
  res.render('hallo', { layout: false, name: req.params.name });
});

app.use((req, res) => {
  res.status(404).show('404.html');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
