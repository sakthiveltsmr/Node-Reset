const { MongoClient } = require("mongodb");

const URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

const client = new MongoClient(URL);

module.exports = {
  db: null,
  register: null,

  async connect() {
    await client.connect();
    console.log("Db connection Established");
    this.db = client.db(DB_NAME);
    console.log("Db name is", DB_NAME);
    this.reg = this.db.collection("register");
  },
};
