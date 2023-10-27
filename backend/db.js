const mongoose = require("mongoose");

const dbURI = "mongodb://localhost:27017/storedb"; // Replace with your MongoDB URI and database name

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to the database");
});

module.exports = mongoose;
