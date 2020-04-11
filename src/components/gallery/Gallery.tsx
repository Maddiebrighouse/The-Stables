import * as React from "react";
import Filter from "../filter/Filter";
import "./Gallery.scss";

type State = {
  filter: boolean;
  err: string;
  active: boolean;
};
class Gallery extends React.Component<{}, State> {
  constructor({}) {
    super({});
    this.toggleClass = this.toggleClass.bind(this);
    this.state = {
      err: "",
      filter: false,
      active: false
    };
  }
  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  render() {
    return (
      <div className="gallery-body">
        <button className="filter" onClick={this.toggleClass}>
          <p className="filter-text">filter</p>
        </button>
        {this.state.active && <Filter />}
        <div className="gallery-container">
          {/* {posts.map((post, i) => {
            <div className="gallery-item">
              <img src={`${post.image}`} alt="placeholder" />
              <div className="comment">
                <p className="day">{post.day}</p>
                <p className="day-comment">{post.comment}</p>
              </div>
            </div>;
          })} */}
          <div className="gallery-item">
            <img src="https://via.placeholder.com/150" alt="placeholder" />
            <div className="comment">
              <p className="day">day #</p>
              <p className="day-comment">comment if one</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
