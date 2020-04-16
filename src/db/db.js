require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.USERNAMEDB}:${process.env.PASSWORDDB}@isolationatthestables-fn9tr.mongodb.net/test?retryWrites=true&w=majority`;

module.exports = {
  getPhotos: async (values) => {
    const clientPromise = MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const client = await Promise.resolve(clientPromise);
    const db = client.db("IsolationStables");
    const output = await db
      .collection("IsolationAtTheStables")
      .find(values)
      .sort({ date: -1 })
      .toArray();
    client.close();
    return output;
  },
  getDay: async (day) => {
    var id = parseInt(day);
    const clientPromise = MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const client = await Promise.resolve(clientPromise);
    const db = client.db("IsolationStables");
    const output = await db
      .collection("IsolationAtTheStables")
      .find({ day: id })
      .sort({ date: -1 })
      .toArray();
    client.close();
    return output;
  },
};
