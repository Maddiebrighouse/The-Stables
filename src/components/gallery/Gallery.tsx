import * as React from "react";
import request from "superagent";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
//import InfiniteScroll from "react-infinite-scroll-component";
import Filter from "../filter/Filter";
import "./Gallery.scss";

type State = {
  err: string;
  active: boolean;
  photos: PhotoType[];
  showDay: boolean;
  imageOpen: boolean;
  photoIndex: number;
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
  comment: String;
}
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
      photoIndex: 0,
    };
  }

  componentDidMount() {
    const dayNumber = parseInt(this.props.match.params.day);
    if (dayNumber > 0) {
      request.get(`/api/v1/days/${dayNumber}`).then((res) => {
        this.setState({
          photos: res.body.value,
          showDay: false,
        });
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
    const { photos, imageOpen, photoIndex } = this.state;
    return (
      <div className="gallery-body">
        <button className="filter" onClick={this.toggleClass}>
          <p className="filter-text">filter</p>
        </button>
        {this.state.active && <Filter />}
        <div className="gallery-container">
          {photos.map((photo) => {
            return (
              <div key={photo._id} className="gallery-item">
                <LazyLoadImage
                  placeholderSrc="https://res.cloudinary.com/isolationstables/image/upload/v1587088566/Isolation/misty/Misty-loading_et5ijk.jpg"
                  src={`${photo.image}`}
                  alt="placeholder"
                  onClick={() => this.setState({ imageOpen: true })}
                />
                {photo.video && <video src={`${photo.video}`} />}
                {imageOpen && (
                  <Lightbox
                    mainSrc={`${photo.image}`}
                    onCloseRequest={() => this.setState({ imageOpen: false })}
                  />
                )}
                <div className="comment">
                  {this.state.showDay && <p className="day">day {photo.day}</p>}
                  <p className="day-comment">{photo.comment}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Gallery;
