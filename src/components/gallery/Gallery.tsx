import * as React from "react";
import request from "superagent";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Lightbox from "react-image-lightbox";
import { useQuery, useSubscription } from "urql";
import gql from "graphql-tag";
//import { Player } from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";
import "react-image-lightbox/style.css";
//import Filter from "../filter/Filter";
import "./Gallery.scss";

const PHOTO_FEED_QUERY = gql`
  {
    posts {
      date
      tags: [String]
      video: String
      image: String
      comment: String
      displayDay: String
    }
  }
`;
type State = {
  err: string;
  active: boolean;
  photos: PhotoType[] | Mock[];
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

interface Mock {
  _id: String;
  date: String;
  tags: [String];
  video: String;
  image: String;
  day: Number;
  comment: String;
  displayDay: String;
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
class Gallery extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.toggleClass = this.toggleClass.bind(this);
    this.state = {
      active: false,
      photos: [],
      err: "",
      showDay: true,
      imageOpen: false,
      devMode: false,
      imageIndex: 0,
    };
  }

  //useQuery({ query: PHOTO_FEED_QUERY });

  componentDidMount() {
    const dayNumber = parseInt(this.props.match.params.day);
    if (dayNumber > 0) {
      request.get(`/api/v1/days/${dayNumber}`).then((res) => {
        this.setState({
          photos: res.body.value,
          showDay: false,
        });
      });
    } else if (this.state.devMode) {
      // remove once app compleant. just fr dev mode.
      this.setState({
        photos: mock,
      });
    } else {
      request.get(`/api/v1`).then((res) => {
        this.setState({
          photos: res.body.value,
        });
      });
    }
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  render() {
    const { photos, imageIndex, imageOpen } = this.state;
    return (
      <div className="gallery-body">
        {/* active when working. */}
        {/* <button className="filter" onClick={this.toggleClass}>
          <p className="filter-text">filter</p>
        </button> */}
        {/* {this.state.active && <Filter />} */}
        <div className="gallery-container">
          <div className="main-day">
            {!this.state.showDay && (
              <h3>{`day ${this.props.match.params.day}`}</h3>
            )}
          </div>
          {photos.length === 0 && (
            <div className="error-message">
              <h3>{message[Math.round(Math.random() * 3)].message}</h3>
            </div>
          )}
          {photos.map((photo, i: number) => {
            return (
              <div key={i} className="gallery-item">
                <LazyLoadImage
                  placeholderSrc="https://res.cloudinary.com/isolationstables/image/upload/v1587088566/Isolation/misty/Misty-loading_et5ijk.jpg"
                  src={`${photo.imageLow}`}
                  alt="placeholder"
                  onClick={() =>
                    this.setState({ imageOpen: true, imageIndex: i })
                  }
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
                  {this.state.showDay && photo.displayDay && (
                    <p className="day">day {photo.displayDay}</p>
                  )}
                  <p className="day-comment">{photo.comment}</p>
                </div>
              </div>
            );
          })}
          {imageOpen && (
            <Lightbox
              imageLoadErrorMessage={
                "I'm either loading or I've failed to load"
              }
              mainSrc={`${photos[imageIndex].image}`}
              onCloseRequest={() => this.setState({ imageOpen: false })}
              nextSrc={`${photos[(imageIndex + 1) % photos.length]}`}
              prevSrc={`${
                photos[(imageIndex + photos.length - 1) % photos.length]
              }`}
              onMovePrevRequest={() =>
                this.setState({
                  imageIndex: (imageIndex + photos.length - 1) % photos.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  imageIndex: (imageIndex + 1) % photos.length,
                })
              }
            />
          )}
        </div>
      </div>
    );
  }
}

export default Gallery;
