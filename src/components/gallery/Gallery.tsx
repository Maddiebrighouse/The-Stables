import * as React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Lightbox from "react-image-lightbox";
import { useQuery, Query } from "urql";

import "../../../node_modules/video-react/dist/video-react.css";
import "react-image-lightbox/style.css";
import "./Gallery.scss";
//import { Player } from "video-react";
//import Filter from "../filter/Filter";

const photoQuery = `
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
const dayQuery = `
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

const Gallery = (props: String) => {
  const [active, setActive] = React.useState(false);
  const [showDay, setShowDay] = React.useState(true);
  const [imageOpen, setImageOpen] = React.useState(false);
  const [imageIndex, setImageIndex] = React.useState();
  const [photos, setPhotos] = React.useState([]);

  let whichQuery;
  let whatDay = parseInt(props.match.params.day);
  if (whatDay >= 0) {
    whichQuery = {
      query: dayQuery,
      variables: { day: whatDay },
    };
  } else {
    whichQuery = {
      query: photoQuery,
    };
  }

  const [{ fetching, data, error }] = useQuery(whichQuery);

  React.useEffect(() => {
    if (!fetching && data.posts) {
      setPhotos(data.posts);
    }
  });

  React.useEffect(() => {
    if (!fetching && data.days) {
      setPhotos(data.days);
      setShowDay(false);
    }
  });

  function toggleClass() {
    const currentState = active;
    setActive(!currentState);
  }

  return (
    <div className="gallery-body">
      {/* active when working. */}
      {/* <button className="filter" onClick={this.toggleClass}>
    <p className="filter-text">filter</p>
  </button> */}
      {/* {this.state.active && <Filter />} */}
      <div className="gallery-container">
        <div className="main-day">
          {!showDay && <h3>{`day ${props.match.params.day}`}</h3>}
        </div>
        {!fetching && photos.length == 0 && (
          <div className="error-message">
            <h3>{message[Math.round(Math.random() * 3)].message}</h3>
          </div>
        )}

        {fetching && <div>Loading...</div>}

        {!fetching &&
          photos.map((photo: any, i: number) => {
            return (
              <div key={i} className="gallery-item">
                {photo.imageLow && (
                  <LazyLoadImage
                    placeholderSrc="https://res.cloudinary.com/isolationstables/image/upload/v1587088566/Isolation/misty/Misty-loading_et5ijk.jpg"
                    src={`${photo.imageLow}`}
                    alt="placeholder"
                    onClick={() => (setImageOpen(true), setImageIndex(i))}
                  />
                )}
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
            mainSrc={`${photos[imageIndex].image}`}
            onCloseRequest={() => setImageOpen(false)}
            nextSrc={`${photos[(imageIndex + 1) % photos.length]}`}
            prevSrc={`${
              photos[(imageIndex + photos.length - 1) % photos.length]
            }`}
            onMovePrevRequest={() =>
              setImageIndex((imageIndex + photos.length - 1) % photos.length)
            }
            onMoveNextRequest={() =>
              setImageIndex((imageIndex + 1) % photos.length)
            }
          />
        )}
      </div>
    </div>
  );
};

export default Gallery;
