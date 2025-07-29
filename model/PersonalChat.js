const mongoose = require("mongoose");

// creating chat schema
const personalChat = new mongoose.Schema({
  text: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  groupId: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
});

const PersonalChat = mongoose.model("PersonalChat", personalChat);

module.exports = PersonalChat;
