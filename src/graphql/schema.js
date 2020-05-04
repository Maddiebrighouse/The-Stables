const typeDefs = [
  `
    type Query {
      posts: [Photos]
      days(day: Int):[Photos]
    }
    type Day {
      days:[Photos]
    }

    type Photos {
      _id: String
      date: String
      tags: [String]
      video: String
      image: String
      imageLow: String
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
