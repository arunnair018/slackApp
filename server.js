const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const userSChema = require("./src/models/UserModel");
const Channel = require("./src/models/ChannelModel");
const message = require("./src/models/MessageModel");
const routes = require("./src/routes/Route");

const app = express();
const port = process.env.PORT || 8000;
const mongourl = process.env.MONGO_URL || "mongodb://localhost:27017/posist";

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("mongo connected...");
  });

// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
}
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

routes(app);

app.listen(port, () => {
  console.log("App listening at port 8000");
});
