require("dotenv").config();

const express = require("express"),
  session = require("express-session"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  routes = require("./routes"),
  Log = require("./models/Log");

const app = express();
const http = require("http").Server(app);

const mimeTypes = {
  "text/css": ["css"],
  "application/javascript": ["js"],
};

app.set("trust proxy", true);
app.set("view engine", "ejs");
app.disable("x-powered-by");
app.disable("etag");
app.use(express.static("public/"));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", routes);

app.use((req, res, next) => {
  let log = new Log();
  log.ip = req.ip;

  if (req.path.length < 100) {
    log.path = req.path;
  } else {
    log.path = req.path.substr(0, 100);
  }

  log.save();

  res.status(404).json({
    error: "Not found",
    path: req.path,
    ip: req.ip,
  });
});

const IP = process.env.IP || "127.0.0.1";
const PORT = process.env.PORT || 3000;

http.listen(PORT, IP, function () {
  console.log(`Server started on port ${PORT}`);
});
