import * as React from "react";
import request from "superagent";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Lightbox from "react-image-lightbox";
import { useQuery, Query } from "urql";
import gql from "graphql-tag";

import "../../../node_modules/video-react/dist/video-react.css";
import "react-image-lightbox/style.css";
import "./Gallery.scss";
//import { Player } from "video-react";
//import Filter from "../filter/Filter";

const PHOTO_FEED_QUERY = gql`
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
type State = {
  err: string;
  active: boolean;
  photos: PhotoType[] | any;
  showDay: boolean;
  imageOpen: boolean;
  devMode: boolean;
  imageIndex: number;
};

type Props = {
  match: any;
};

interface PhotoType {
  _id: String;
  date: String;
  tags: [String];
  video: String;
  image: String;
  day: Number;
  comment?: String;
  displayDay?: String;
}

const message = [
  {
    message:
      "We must be very dull people to have done nothing at all on this day.",
  },
  {
    message:
      "Sorry, Madeleine, Buster, Ravid, Arnie, Michael and Loewn can't come to the phone right now. They are busy doing bigger and better things.",
  },
  {
    message:
      "Clearly we were either play Animal Crossing or Mario kart and were to busy to take photos on this day, soz.",
  },
  {
    message: "Madeleine! Why did you not take any photos",
  },
  {
    message: "No, No, Please No Paparazzi",
  },
  {
    message: "On this day we just ate, slept and shat",
  },
];

const Gallery = () => {
  const [active, setActive] = React.useState(false);
  const [showDay, setShowDay] = React.useState(true);
  const [imageOpen, setImageOpen] = React.useState(false);
  const [imageIndex, setImageIndex] = React.useState([]);
  const [photos, setPhotos] = React.useState([]);
  function toggleClass() {
    const currentState = active;
    setActive(!currentState);
  }
  const [result] = useQuery({
    query: PHOTO_FEED_QUERY,
  });
  // React.useEffect(() => {
  //   setShowDay(false);
  //   setPhotos([result]);
  // });

  console.log(result);
  return (
    <div className="gallery-body">
      {/* active when working. */}
      {/* <button className="filter" onClick={this.toggleClass}>
    <p className="filter-text">filter</p>
  </button> */}
      {/* {this.state.active && <Filter />} */}
      <div className="gallery-container">
        <div className="main-day">
          {!showDay && <h3>{`day ${match.params.day}`}</h3>}
        </div>
        {/* {result.fetching && result.data === undefined && (
          <div className="error-message">
            <h3>{message[Math.round(Math.random() * 3)].message}</h3>
          </div>
        )} */}
        {result.fetching && <div>Loading...</div>}

        {!result.fetching &&
          result.data.posts.map((photo: any, i: number) => {
            return (
              <div key={i} className="gallery-item">
                <LazyLoadImage
                  placeholderSrc="https://res.cloudinary.com/isolationstables/image/upload/v1587088566/Isolation/misty/Misty-loading_et5ijk.jpg"
                  src={`${photo.imageLow}`}
                  alt="placeholder"
                  onClick={() => (setImageOpen(true), setImageIndex(i))}
                />

                {/* Todo get videos rendering */}
                {/* {photo.video && (
            <Player
              playsInline
              poster={`${photo.placeholder}`}
              src={`${photo.video}`}
            />
          )} */}
                <div className="comment">
                  {showDay && photo.displayDay && (
                    <p className="day">day {photo.displayDay}</p>
                  )}
                  <p className="day-comment">{photo.comment}</p>
                </div>
              </div>
            );
          })}
        {imageOpen && (
          <Lightbox
            imageLoadErrorMessage={"I'm either loading or I've failed to load"}
            mainSrc={`${result.data.posts[imageIndex].image}`}
            onCloseRequest={() => setImageOpen(false)}
            nextSrc={`${
              result.data.posts[(imageIndex + 1) % result.data.posts.length]
            }`}
            prevSrc={`${
              result.data.posts[
                (imageIndex + result.data.posts.length - 1) %
                  result.data.posts.length
              ]
            }`}
            onMovePrevRequest={() =>
              setImageIndex(
                (imageIndex + result.data.posts.length - 1) %
                  result.data.posts.length
              )
            }
            onMoveNextRequest={() =>
              setImageIndex((imageIndex + 1) % result.data.posts.length)
            }
          />
        )}
      </div>
    </div>
  );
};

export default Gallery;
