const mongoose = require("mongoose");
const mongooseConnection = () => {
  try {
    const uri =
      process.env.MONGODB_URL || "mongodb:/localhost:27017/serverless";
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = mongooseConnection;
