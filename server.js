const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;

const db = require('./models');

const app = express();

app.use(logger('dev'));

// require('./routes/apiRoutes')(app);
// require('./routes/htmlRoutes')(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workouts', {
  useNewUrlParser: true,
});

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
  }),
);
app.set('view engine', 'handlebars');
/*

    HTML Routes

*/
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/run', (req, res) => {
  db.Run.find({})
    .then((dbRun) => {
      res.render('run', { runs: dbRun });
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get('/bike', (req, res) => {
  db.Bike.find({})
    .then((dbBike) => {
      res.render('bike', { bikes: dbBike });
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get('/weight', (req, res) => {
  db.Weight.find({})
    .then((dbWeight) => {
      res.render('weight', { weights: dbWeight });
    })
    .catch((err) => {
      res.json(err);
    });
});
/*

    API Routes

*/

// post run info
app.post('/api/run', ({ body }, res) => {
  db.Run.create(body)
    .then((dbRun) => {
      res.json(dbRun);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post('/api/bike', ({ body }, res) => {
  db.Bike.create(body)
    .then((dbBike) => {
      res.json(dbBike);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post('/api/weight', ({ body }, res) => {
  db.Run.create(body)
    .then((dbWeight) => {
      res.json(dbWeight);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
