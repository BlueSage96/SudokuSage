process.noDeprecation = true; //suppress deprecation warnings in console
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
let mongoURL = process.env.MONGO_URI;
const cookieParser = require("cookie-parser");

const csrf = require("csurf");
const csrfMiddleware = csrf();
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// connectDB
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

// routers
const authRouter = require("./routes/auth");
const gameRouter = require("./routes/game");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

if (process.env.NODE_ENV == "test") mongoURL = process.env.MONGO_URI_TEST;

const corsOptions = {
  origin: [ "https://sudokusage-n773.onrender.com", "http://localhost:3000", "http://localhost:5173", "http://localhost:5174" ],
};

app.use(express.json());

// security packages
app.use(
  cors({
    ...corsOptions,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(xss());
app.use(helmet());
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 10000, //up to ___ requests for each IP address
  })
);
app.use(cookieParser());
// extra packages

app.use(express.static("public"));
// new
app.use((req, res, next) => {
  if (req.path == "/multiply") {
    res.set("Content-Type", "application/json");
  } else {
    res.set("Content-Type", "text/html");
  }
  next();
});
// routes
app.use("/api/v1/sudoku/auth", authRouter);
app.use("/api/v1/sudoku/game", authenticateUser, gameRouter);

// new
app.get("/multiply", (req, res) => {
  const result = req.query.first * req.query.second;
  if (result.isNaN) {
    result = "NaN";
  } else if (result == null) {
    result = "null";
  }
  res.json({ result: result });
});

app.use(csrfMiddleware);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
// new
const start = () => {
  try {
    require("./db/connect")(mongoURL);
    return app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = { app };
