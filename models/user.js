const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

// User Schema
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  // hold all info in user object
  runs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Run"
    }
  ],
  bikes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bike"
    }
  ],
  weight: [
    {
      type: Schema.Types.ObjectId,
      ref: "Weight"
    }
  ]
});

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserByUsername = function(username, callback) {
  const query = { username };
  User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
