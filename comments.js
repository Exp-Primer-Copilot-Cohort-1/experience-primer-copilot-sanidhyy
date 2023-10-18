// create web server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 4001;
const mongoose = require("mongoose");
const config = require("./config/db");
const commentRoute = require("./routes/comment.route");
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");
const passport = require("passport");
const passportConfig = require("./config/passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);

// connect to mongodb
mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log("Database is connected");
    },
    (err) => {
      console.log("Can not connect to the database" + err);
    }
  );

// for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(
  session({
    secret: "mysecret",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/comments", commentRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);

// start server
app.listen(port, function () {
  console.log("Server is running on port: " + port);
});
