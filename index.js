require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./route/userRoute");
const profileRoute = require("./route/profileRoute");
const messageRoute = require("./route/messageRoute");
const chatRoute = require("./route/chatRoute");
const groupRoute = require("./route/groupRoute");
const personalChatRoute = require("./route/personalRoute");
const privateRoute = require("./route/privateRoute");
const likeRoute = require("./route/likeRoute");
const followerRoute = require("./route/followerRoute");
const followingRoute = require("./route/followingRoute");
const commentRoute = require("./route/commentRoute");
const mongodbConnection = require("./connectDb");

// middileware configuration

// cors congigurations
// const allowedOrigins = ["https://chathubb.netlify.app"];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Access blocked by cors policy"));
//     }
//   },
// };

// app.use(cors(corsOptions));
app.use(cors("*"));
app.use(express.json());
app.use(express.static("public"));

// mongodb with mongoose connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("mongodb is connected successfully");
  })
  .catch((err) => {
    console.error("Error occured while connecting to the mongoDB", err);
  });

// routes defining
app.use("/user", userRoute);
app.use("/profile", profileRoute);
app.use("/message", messageRoute);
app.use("/chat", chatRoute);
app.use("/group", groupRoute);
app.use("/personalchat", personalChatRoute);
app.use("/privateaccount", privateRoute);
app.use("/like", likeRoute);
app.use("/follower", followerRoute);
app.use("/following", followingRoute);
app.use("/comment", commentRoute);

// port number configuration with process.env
const port = process.env.PORT || 5000;

// server listening function
app.listen(port, async () => {
  try {
    await mongodbConnection();
    console.log(`server running at port number ${port}`);
  } catch (error) {
    console.error(error);
  }
});
