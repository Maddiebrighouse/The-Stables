import * as React from "react";
import request from "superagent";
import Filter from "../filter/Filter";
import "./Gallery.scss";

type State = {
  err: string;
  active: boolean;
  photos: PhotoType[];
  showDay: boolean;
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
    const { photos } = this.state;
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
                <img src={`${photo.image}`} alt="placeholder" />
                {photo.video && <video src={`${photo.video}`} />}
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
