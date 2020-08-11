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

module.exports.list = async (req, res) => {
  let user = req.user._id;
  let channel = await Channel.aggregate([
    { $match: { invites: { $in: [mongoose.Types.ObjectId(user)] } } },
    {
      $project: {
        _id: 1,
        name: 1,
        invites: 1,
      },
    },
    {
      $lookup: {
        from: "messages",
        localField: "_id",
        foreignField: "channel",
        as: "posts",
      },
    },
    { $unwind: { path: "$posts", preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: "$_id",
        channelname: { $first: "$name" },
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);
  res.json(channel);
};
