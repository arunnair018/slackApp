"use strict";

const mongoose = require("mongoose");
const Message = mongoose.model("Message");

module.exports.create = (req, res) => {
  let data = {
    user: req.user._id,
    username:req.user.username,
    channel: req.body.channel,
    message: req.body.message,
  };
  var newMessage = new Message(data);
  newMessage.save((err, message) => {
    if (err) {
      res.json({ err: err });
    } else {
      res.json({ message: message });
    }
  });
};

module.exports.list = (req, res) => {
  let channel = req.params.channel
  Message.find({channel: mongoose.Types.ObjectId(channel)}, (err, messages) => {
    if (err) {
      res.json(err);
    } else {
      res.json(messages);
    }
  });
};
