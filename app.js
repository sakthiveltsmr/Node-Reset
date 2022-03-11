require("dotenv").config();
const express = require("express");

const db = require("./share/mongodb");

const cors = require("cors");

const app = express();

(async () => {
  try {
    await db.connect();
    app.use(cors());
    app.use(express.json());
    app.use((req, res, next) => {
      console.log("user middle ware");
      next();
    });

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`sevrver running at ${PORT}`);
    });
  } catch (err) {
    console.log("error", err);
  }
})();
