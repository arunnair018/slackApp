const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = mongoose.model("User");

//authentication function
const Auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Basic ", "");

    const data = jwt.verify(token, "5ebe2294ecd0e0f08eab7690d2a6ee69");
    const user = await User.findOne({
      _id: data._id,
    });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      error: "You are not authorized to access this resource...",
    });
  }
};

module.exports = Auth;
