const mongoose = require("mongoose");

const MONGOURI = "mongodb+srv://rpmurph4:zupt5stoh_IC3flaw@cluster0.qoje5.mongodb.net/auth?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;