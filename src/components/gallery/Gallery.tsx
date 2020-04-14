import * as React from "react";
import request from "superagent";
import Filter from "../filter/Filter";
import "./Gallery.scss";

type State = {
  err: string;
  active: boolean;
  photos: PhotoType[];
};

interface PhotoType {
  _id: IDBDatabase;
  date: String;
  tags: [String];
  image: String;
  day: Number;
  comment: String;
}
class Gallery extends React.Component<{}, State> {
  constructor({}) {
    super({});
    this.toggleClass = this.toggleClass.bind(this);
    this.state = {
      active: false,
      photos: [],
      err: "",
    };
  }

  componentDidMount() {
    request.get(`/api/v1`).then((res) => {
      this.setState({
        photos: res.body.value,
      });
    });
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  render() {
    const { photos } = this.state;
    return (
      <div className="gallery-body">
        <button className="filter" onClick={this.toggleClass}>
          <p className="filter-text">filter</p>
        </button>
        {this.state.active && <Filter />}
        <div className="gallery-container">
          {photos.map((photo, index) => {
            return (
              <div className="gallery-item">
                <img src={`${photo.image}`} alt="placeholder" />
                <div className="comment">
                  <p className="day">day {photo.day}</p>
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
