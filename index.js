const express = require("express");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const keys = require("./config/keys");

const multer = require("multer");

const { GridFsStorage } = require("multer-gridfs-storage");

require("dotenv").config();

require("./models/User");

const passport = require("passport");
const { options } = require("mongoose");
require("./services/passport");

// mongoose.connect('mongodb://user:pass@localhost:port/database')
mongoose.connect(keys.mongoose, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let bucket;

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);



app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

//to parse body from url
app.use(
  express.urlencoded({
    extended: false,
  })
);

const port = 5500;
app.listen(port);
