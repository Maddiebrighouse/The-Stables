const typeDefs = [
  `
    type Query {
      posts: [Photos]
      days(day: Int):[Photos]
      people(tags: [String]):[Photos]
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
