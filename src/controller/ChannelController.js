"use strict";

const mongoose = require("mongoose");
const Channel = mongoose.model("Channel");

module.exports.create = (req, res) => {
  let data = {
    user: req.user._id,
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags,
    invites: req.body.invites,
  };
  var newChannel = new Channel(data);
  newChannel.save((err, channel) => {
    if (err) {
      res.json({ err: err });
    } else {
      res.json({ channel: channel });
    }
  });
};

module.exports.list = (req, res) => {
  let user = req.user._id;
  Channel.find(
    { invites: { $in: [mongoose.Types.ObjectId(user)] } },
    (err, channels) => {
      if (err) {
        res.json(err);
      } else {
        res.json(channels);
      }
    }
  );
};
