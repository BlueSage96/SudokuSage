process.noDeprecation = true; //suppress deprecation warnings in console
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const env = process.env.NODE_ENV || "development";
const mongoURL = process.env.MONGO_URI;
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

//if (process.env.NODE_ENV == "test") mongoURL = process.env.MONGO_URI_TEST;
// Defer creating the MongoDB session store until after we have a successful
// DB connection. Creating the store earlier can attempt to connect immediately
// and surface transient/auth errors (causing intermittent test failures).

let store; // created after DB connect in start()

const corsOptions = {
  origin: [
    "https://sudokusage-n773.onrender.com",
    "http://localhost:3000",
    "http://localhost:4000",
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
if (process.env.NODE_ENV === "development") {
  // 🔹 DEV → USE PROXY TO VITE
  const { createProxyMiddleware } = require("http-proxy-middleware");
  const proxyMiddleware = createProxyMiddleware({
    target: "http://localhost:5173",
    changeOrigin: true,
    ws: true,
    logLevel: "silent",
  });

  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    return proxyMiddleware(req, res, next);
  });
} else if (process.env.NODE_ENV === "test") {
  // 🔹 TEST → DO **NOT** PROXY
  // 🔹 TEST → SERVE THE BUILT REACT APP INSTEAD OF VITE
  const path = require("path");
  const buildPath = path.join(__dirname, "../Frontend/dist");

  app.use(express.static(buildPath));

  // All non-API routes → React index.html
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api")) return;
    res.sendFile(path.join(buildPath, "index.html"));
  });
} else {
  // 🔹 PRODUCTION → SERVE THE BUILT REACT APP
  const path = require("path");
  const buildPath = path.join(__dirname, "../Frontend/dist");

  app.use(express.static(buildPath));
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api")) return;
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

const port = process.env.PORT || 3000;
// new
const start = async () => {
  try {
    console.log(
      "Connecting to Mongo:",
      mongoURL.replace(/(mongodb\+srv:\/\/)([^:]+):([^@]+)@/, "$1<user>:<password>@")
    );
    await connectDB(mongoURL);
    if (env !== "test") {
          store = new MongoDBStore({
      uri: mongoURL,
      collection: "mySessions",
    });

    store.on("error", function (error) {
      console.log("Session store error:", error);
    });
    } else {
      console.log("Test env: skipping MongoDB session store (using default MemoryStore).");
    }

    return app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = { app };
