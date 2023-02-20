const express = require("express");
const { connection } = require("./config/db");
const { authenticate } = require("./middlewares/authenticate.middleware");
const { postRouter } = require("./routes/post.routes");
const { userRouter } = require("./routes/user.routes");
const cors = require("cors");
require("dotenv").config();

const port = process.env.port;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

app.use("/users", userRouter);
app.use(authenticate);
app.use("/posts", postRouter);

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to database.");
  } catch (error) {
    console.log("Failed to connect with database.");
    console.log(error);
  }
  console.log(`server running on port ${port}`);
});
