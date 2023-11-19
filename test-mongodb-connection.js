const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_DB_URL } = require("./.env"); // Använd rätt sökväg till din .env-fil

mongoose.connect(MONGODB_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Anslutningsfel:", error);
});

db.once("open", () => {
  console.log("Anslutning till MongoDB Atlas lyckades!");
});
