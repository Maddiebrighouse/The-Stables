const typeDefs = [
  `
    type Query {
      posts: [Photos]
    }
    type Photos {
      _id: String
      date: String
      tags: [String]
      video: String
      image: String
      day: Int
      comment: String
      displayDay: String

      }
    schema {
      query: Query
    }
  `,
];

module.exports = typeDefs;
