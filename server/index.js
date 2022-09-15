const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

const tourRouter = require("./routes/Tour");
app.use("/tour", tourRouter);

const poiRouter = require("./routes/Poi");
app.use("/poi", poiRouter);

const userRouter = require("./routes/User");
app.use("/auth", userRouter);

const touristRouter = require("./routes/Tourist");
app.use("/tourist", touristRouter);

const favRouter = require("./routes/Favorite");
app.use("/fav", favRouter);

const revRouter = require("./routes/Review");
app.use("/rev", revRouter);

const quizRouter = require("./routes/Quiz");
app.use("/quiz", quizRouter);

const imgRouter = require("./routes/Image");
app.use("/img", imgRouter);

app.use("/Images", express.static("./Images"));

db.sequelize.sync().then(() => {
  app.listen(4000, () => {
    console.log("Server running on port 4000");
  });
});
