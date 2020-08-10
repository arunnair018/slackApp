"use strict";

const mongoose = require("mongoose");
const User = require("./UserModel");

// User Schema
const channelSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  tags: {
    type: [String],
  },
  invites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

channelSchema.set("timestamps", true);

// model the schema
const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;
