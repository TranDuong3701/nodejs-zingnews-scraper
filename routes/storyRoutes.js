const express = require("express");
const storyController = require("./../controller/stroryController");

const router = express.Router();

router
  .route("/")
  .get(storyController.getAllStory)
  .post(storyController.createStory);

router
  .route("/:id")
  .get(storyController.getStory)
  .patch(storyController.updateStory)
  .delete(storyController.deleteStory);
