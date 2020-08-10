"use strict";

const mongoose = require("mongoose");
const Message = mongoose.model("Message");
const User = mongoose.model("User");
const Channel = mongoose.model("Channel");

module.exports.metric = async (req, res) => {
  console.log(req.body);
  let d1 = new Date(Date.parse(req.body.d1));
  let d2 = new Date(Date.parse(req.body.d2));

  let dateRange = {
    createdAt: {
      $gte: d1,
      $lte: d2,
    },
  };

  console.log(dateRange);
  const topUser = await Message.aggregate([
    {
      $match: dateRange,
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "users",
      },
    },
    { $unwind: "$users" },
    {
      $group: {
        _id: "$user",
        username: { $last: "$users.username" },
        count: { $sum: 1 },
      },
    },
    { $project: { _id: 0, username: "$username", count: 1 } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);
  const topChannels = await Message.aggregate([
    {
      $match: dateRange,
    },
    {
      $lookup: {
        from: "channels",
        localField: "channel",
        foreignField: "_id",
        as: "channels",
      },
    },
    { $unwind: "$channels" },
    {
      $group: {
        _id: "$channel",
        channelname: { $last: "$channels.name" },
        count: { $sum: 1 },
      },
    },
    { $project: { _id: 0, channelname: "$channelname", count: 1 } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);
  const topRegion = await User.aggregate([
    {
      $match: dateRange,
    },
    {
      $group: {
        _id: "$region",
        count: { $sum: 1 },
      },
    },
    { $project: { _id: 0, region: "$_id", count: 1 } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);
  const topTags = await Channel.aggregate([
    {
      $match: dateRange,
    },
    { $unwind: "$tags" },
    {
      $group: {
        _id: "$tags",
        count: { $sum: 1 },
      },
    },
    { $project: { _id: 0, tag: "$_id", count: 1 } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);
  res.json({ topUser, topChannels, topRegion, topTags });
};

module.exports.search = (req, res) => {
  Message.find(
    { message: { $regex: req.body.query, $options: "i" } },
    function (err, msg) {
      if (err) {
        res.json({ err });
      }
      console.log(msg);
      res.json(msg);
    }
  );
};
