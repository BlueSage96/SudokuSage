process.noDeprecation = true; //suppress deprecation warnings in console
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
let mongoURL = process.env.MONGO_URI;
const cookieParser = require("cookie-parser");

const csrf = require("csurf");
const csrfMiddleware = csrf({ cookie: true });
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// connectDB
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

// routers
const authRouter = require("./routes/auth");
const gameRouter = require("./routes/game");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

if (process.env.NODE_ENV == "test") mongoURL = process.env.MONGO_URI_TEST;
const store = new MongoDBStore({
  uri: mongoURL,
  collection: "mySessions",
});

store.on("error", function (error) {
  console.log(error);
});

const corsOptions = {
  origin: [
    "https://sudokusage-n773.onrender.com",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
  ],
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
    max: 1000000, //up to ___ requests for each IP address
  })
);
app.use(cookieParser());
// extra packages

app.use(express.static("public"));

// routes
app.use("/api/v1/sudoku/auth", csrfMiddleware, authRouter);
app.use("/api/v1/sudoku/game", authenticateUser, gameRouter);

app.get("/multiply", (req, res) => {
  const result = req.query.first * req.query.second;
  if (result.isNaN) result = "NaN";
  else if (result == null) result = "null";
  res.json({ result: result });
});

// Proxy non-API routes to React frontend dev server (for testing/development)
if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  const { createProxyMiddleware } = require("http-proxy-middleware");
  const proxyMiddleware = createProxyMiddleware({
    target: "http://localhost:5173",
    changeOrigin: true,
    ws: true, // proxy websockets for HMR
    logLevel: "silent",
  });
  // Only proxy routes that don't start with /api
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    return proxyMiddleware(req, res, next);
  });
  // Still need notFoundMiddleware for unmatched API routes
  app.use(notFoundMiddleware);
} else {
  app.get("/", csrfMiddleware, (req, res) => {
    res.render("index", { csrfToken: req.csrfToken() });
  });
  app.use(notFoundMiddleware);
}
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
