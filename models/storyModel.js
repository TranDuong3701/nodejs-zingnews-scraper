const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: String,
  url: {
    type: String,
    unique: true,
  },
  summary: String,
  author: String,
  datePosted: Date,
  urlAuthor: String,
});

const Story = mongoose.model("Story", storySchema);
module.exports = Story;
