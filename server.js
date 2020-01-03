const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");

const PORT = process.env.PORT || 3000;

// passport exampl from https://medium.com/gomycode/authentication-with-passport-js-73ca65b25feb

const db = require("./models");

const app = express();

app.use(logger("dev"));

// require('./routes/apiRoutes')(app);
// require('./routes/htmlRoutes')(app);

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express Session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouts", {
  useNewUrlParser: true
});

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
/*

    HTML Routes

*/

// home route, checks if you are logged in or not
app.get("/", (req, res) => {
  if (!req.user) {
    res.render("home");
  } else {
    res.render("loggedinHome");
  }
});

// page for viewing and adding runs
app.get("/run", (req, res) => {
  if (!req.user) {
    res.render("login");
  } else {
    const user = req.user.username;
    db.User.find({ username: user })
      .populate("runs")
      .then(dbUser => {
        res.render("run", { runs: dbUser[0].runs });
      })
      .catch(err => {
        res.json(err);
      });
  }
});

// for viewing and adding bike stuff
app.get("/bike", (req, res) => {
  if (!req.user) {
    res.render("login");
  } else {
    const user = req.user.username;
    db.User.find({ username: user })
      .populate("bikes")
      .then(dbUser => {
        res.render("bike", { bikes: dbUser[0].bikes });
      })
      .catch(err => {
        res.json(err);
      });
  }
});

// for weight lifting
app.get("/weight", (req, res) => {
  if (!req.user) {
    res.render("login");
  } else {
    const user = req.user.username;
    db.User.find({ username: user })
      .populate("weight")
      .then(dbUser => {
        res.render("weight", { weights: dbUser[0].weight });
      })
      .catch(err => {
        res.json(err);
      });
  }
});

// all workouts
app.get("/all", (req, res) => {
  if (!req.user) {
    res.render("login");
  } else {
    const user = req.user.username;
    db.User.find({ username: user })
      .populate("runs")
      .populate("bikes")
      .populate("weight")
      .then(dbUser => {
        res.render("combined", {
          runs: dbUser[0].runs,
          bikes: dbUser[0].bikes,
          weight: dbUser[0].weight
        });
      })
      .catch(err => {
        res.json(err);
      });
  }
});

// login page
app.get("/login", (req, res) => {
  res.render("login");
});

// signup page
app.get("/signup", (req, res) => {
  res.render("signup");
});
/*

    API Routes

*/

// post run info
app.post("/api/run", ({ body, user }, res) => {
  db.Run.create(body)
    .then(({ _id }) =>
      db.User.findOneAndUpdate(
        { username: user.username },
        { $push: { runs: _id } },
        { new: true }
      )
    )
    .then(dbRun => {
      res.json(dbRun);
    })
    .catch(err => {
      res.json(err);
    });
});

// post bike info
app.post("/api/bike", ({ body, user }, res) => {
  db.Bike.create(body)
    .then(({ _id }) =>
      db.User.findOneAndUpdate(
        { username: user.username },
        { $push: { bikes: _id } },
        { new: true }
      )
    )
    .then(dbRun => {
      res.json(dbRun);
    })
    .catch(err => {
      res.json(err);
    });
});

// post weight info
app.post("/api/weight", ({ body, user }, res) => {
  db.Weight.create(body)
    .then(({ _id }) =>
      db.User.findOneAndUpdate(
        { username: user.username },
        { $push: { weight: _id } },
        { new: true }
      )
    )
    .then(dbRun => {
      res.json(dbRun);
    })
    .catch(err => {
      res.json(err);
    });
});

// login stuff

passport.use(
  new LocalStrategy((username, password, done) => {
    User.getUserByUsername(username, (err, user) => {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: "Unknown User" });
      }
      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { message: "Invalid password" });
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});

// Register User
app.post("/register", (req, res) => {
  const { password } = req.body;
  const { password2 } = req.body;

  // checks if password 1 and 2 match
  if (password == password2) {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    // cerates the user in the db
    User.createUser(newUser, (err, user) => {
      if (err) throw err;
      res.send(user).end();
    });
  } else {
    res
      .status(500)
      .send('{errors: "Passwords don\'t match"}')
      .end();
  }
});

// Endpoint to login
app.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

// Endpoint to get current user
app.get("/user", (req, res) => {
  res.send(req.user);
});

// Endpoint to logout
app.get("/logout", (req, res) => {
  req.logout();
  res.render("home");
});

// basic listener
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
