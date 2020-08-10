"use strict";

const user = require("../controller/UserController");
const channel = require("../controller/ChannelController");
const auth = require("../middlewares/auth");
const message = require("../controller/MessageController");
const metrics = require("../controller/MetricController");

module.exports = (app) => {
  // auth api's
  app.route("/login").post(user.login);
  app.route("/users").post(user.register).get(user.list);
  app.route("/channel").get(auth, channel.list).post(auth, channel.create);
  app.route("/message/:channel").get(auth, message.list);
  app.route("/message").post(auth, message.create);
  app.route("/metrics").post(metrics.metric);
  app.route("/search").post(metrics.search);
};
