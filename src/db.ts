import config from ".";
const mongoose = require("mongoose");

export default async () => {
  try {
    const { mongo_uri } = config;
    await mongoose.connect(mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
    });
    console.log("db connected");
  } catch (error) {
    console.log("db not connected\n" + error);
  }
};
