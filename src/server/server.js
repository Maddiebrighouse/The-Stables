require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const cors = require("cors");

const server = express();
server.use(cors());

const homePath = "/graphiql";
const URL = "http://localhost";
//const PORT = 3000;
const MONGO_URL = `mongodb+srv://${process.env.USERNAMEDB}:${process.env.PASSWORDDB}@isolationatthestables-fn9tr.mongodb.net/test?retryWrites=true&w=majority`;

const start = async () => {
  try {
    const clientPromise = MongoClient.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const client = await Promise.resolve(clientPromise);
    const db = client.db("IsolationStables");
    const Posts = await db.collection("IsolationAtTheStables");
    const resolvers = {
      Query: {
        posts: async () => {
          return await Posts.find({}).sort({ date: -1 }).toArray();
        },
        days: async (parent, args, context) => {
          return await Posts.find({ day: args.day })
            .sort({ date: -1 })
            .toArray();
        },
      },
    };
    const schema = makeExecutableSchema({
      typeDefs: require("../graphql/schema"),
      resolvers,
    });

    server.use(bodyParser.json());
    server.use(express.static(path.join(__dirname, "../../public")));

    server.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

    server.use(
      homePath,
      graphiqlExpress({
        endpointURL: "/graphql",
      })
    );

    server.listen(PORT, () => {
      console.log(`Visit for graphql ${URL}:${PORT}${homePath}`);
      console.log(`Visit ${URL}:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = start;
