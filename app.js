const express = require("express");

const storyRouter = require("./routes/storyRoutes");

const app = express();

app.use(express.json());

app.use("api/v1/stories", storyRouter);

app.listen(3000, () => console.log("Server is running on port 3000..."));
