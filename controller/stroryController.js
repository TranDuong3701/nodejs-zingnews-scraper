const Story = require("./../models/storyModel");

exports.getAllStory = async (req, res, next) => {
  const stories = await Story.find();

  res.status(200).json({
    status: "success",
    results: stories.length,
    data: {
      stoties,
    },
  });
};

exports.getStory = async (req, res, next) => {
  const story = await Story.findById(req.params.id);
};

exports.createStory = async (req, res, next) => {};

exports.updateStory = async (req, res, next) => {};

exports.deleteStory = async (req, res, next) => {};
