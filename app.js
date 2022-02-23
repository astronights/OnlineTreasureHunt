require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const app = express();
const http = require("http").Server(app);

const mimeTypes = {
  "text/css": ["css"],
  "application/javascript": ["js"],
};

app.set("view engine", "ejs");
app.use(express.static("./public/"));
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

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;

http.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
