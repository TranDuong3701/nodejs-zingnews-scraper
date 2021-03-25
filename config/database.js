const mongoose = require("mongoose");

// Connect database
const connect = () => {
  mongoose
    .connect("mongodb://localhost/mydb", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connection successful!"));
};

module.exports = connect;
