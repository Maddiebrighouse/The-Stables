import * as React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Lightbox from "react-image-lightbox";
import { useQuery } from "urql";
// typesripct error fix
import { Player } from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";
import "react-image-lightbox/style.css";

import "./Gallery.scss";
import Filter from "../filter/Filter";
import { photoQuery, dayQuery, peopleQuery } from "./query";
import messages from "./message";

const Gallery = (props: String) => {
  const [active, setActive] = React.useState(false);
  const [showDay, setShowDay] = React.useState(true);
  const [imageOpen, setImageOpen] = React.useState(false);
  const [imageIndex, setImageIndex] = React.useState(0);
  const [photos, setPhotos] = React.useState([]);
  const [filterNew, setFilterNew] = React.useState(false);
  const [filterPeople, setFilterPeople] = React.useState("");
  const [filterPeopleActive, setFilterPeopleActive] = React.useState(false);

  let whichQuery;
  // Typescritp error fix
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

  if (filterPeopleActive) {
    whichQuery = {
      query: peopleQuery,
      variables: { tags: filterPeople },
    };
  }
  const [{ fetching, data, error }] = useQuery(whichQuery);
  console.log(error);

  React.useEffect(() => {
    if (data) {
      if (!fetching && data.posts) {
        setPhotos(data.posts);
      }
    }
  });

  React.useEffect(() => {
    if (data) {
      if (!fetching && data.days) {
        setPhotos(data.days);
        setShowDay(false);
      }
    }
  });

  React.useEffect(() => {
    if (data) {
      if (!fetching && data.people) {
        setPhotos(data.people);
      }
    }
  });

  function toggleClass() {
    const currentState = active;
    setActive(!currentState);
  }

  if (filterNew) {
    setPhotos(photos.reverse());
    setFilterNew(false);
  }

  function handleFilterChange(filter: any) {
    if (typeof filter === "boolean") {
      setFilterNew(filter);
    }
    if (typeof filter === "string") {
      setFilterPeople(filter);
      setFilterPeopleActive(true);
    }
  }

  return (
    <div className="gallery-body">
      {/* active when working. */}
      {window.innerWidth > 760 && (
        <button className="filter" onClick={toggleClass}>
          <p className="filter-text">filter</p>
        </button>
      )}

      {window.innerWidth > 760 && active && (
        <Filter onActiveChange={handleFilterChange} />
      )}

      <div className="gallery-container">
        <div className="main-day">
          {!showDay && <h3>{`day ${props.match.params.day}`}</h3>}
        </div>
        {!fetching && photos.length == 0 && (
          <div className="error-message">
            <h3>{messages[Math.round(Math.random() * 3)].message}</h3>
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
                {photo.video && (
                  <Player
                    playsInline
                    aspectRatio={"auto"}
                    height={400}
                    fluid={false}
                    poster={`${photo.placeholder}`}
                    src={`${photo.video}`}
                  />
                )}
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
