const express = require("express");
const session = require("express-session");
const cors = require("cors");
const connect = require("./schemas");

const memberRouter = require("./routes/memberRouter");
const boardRouter = require("./routes/boardRouter");
const routineRouter = require("./routes/routineRouter");
const commentRouter = require("./routes/commentRouter");

const app = express();
const port = 8080;

app.use(express.static("build"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/build/index.html");
});
// Middleware
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "ojrkkk",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connect();

// Routers
app.use("/member", memberRouter);
app.use("/board", boardRouter);
app.use("/routine", routineRouter);
app.use("/comment", commentRouter);
// Server Start
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
