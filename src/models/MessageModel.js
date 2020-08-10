"use strict";

const mongoose = require("mongoose");

// User Schema
const messageSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
  },
  message: {
    type: String,
    required: true,
  },
});

messageSchema.set("timestamps", true);

// model the schema
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
