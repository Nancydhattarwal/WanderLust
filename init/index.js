const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const User = require("../models/user");
const initData = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wander";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
};

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "680c56e29c5673827a0a2b66",
    }))
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();