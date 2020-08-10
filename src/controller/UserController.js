"use strict";

const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports.register = async (req, res) => {
  var newUser = new User(req.body);
  const user = await newUser.save().catch((err) => {
    res.status(400).json({ error: err.message });
  });
  if (user) {
    res.json({ status: "added successfully", user: user });
  }
};

module.exports.login = async (req, res) => {
  const { email, password, region } = req.body;
  const user = await User.findByCredentials(email, password, region);
  if (user.error) {
    res.status(400).json(user);
  } else {
    const token = await user.generateAuthToken();
    const username = user.username;
    const region = user.region;
    const id = user._id;
    res.json({ token: token, username: username, region: region, _id: id });
  }
};

module.exports.list = (req, res) => {
  User.find({}, { username: 1, _id: 1, region: 1 }, (err, user) => {
    if (err) {
      res.json({ err: err });
    } else {
      res.json(user);
    }
  });
};
