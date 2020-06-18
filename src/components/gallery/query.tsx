export const photoQuery = `
  query {
    posts {
      date
      tags
      video
      image
      imageLow
      comment
      displayDay
    }
  }
`;
export const dayQuery = `
  query($day: Int) {
      days(day: $day) {
        date
        tags
        video
        image
        imageLow
        comment
    }
  }
`;

export const peopleQuery = `
query($tags: [String!]) {
  people(tags: $tags) {
    date
    video
    image
    imageLow
    comment
  }
}
`;
