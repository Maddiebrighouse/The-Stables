import React from "react";
import Filter from "../filter/Filter";
import "./Gallery.scss";

class Gallery extends React.Component<{}> {
  constructor({}) {
    super({});
    this.state = {
      filterButton: false,
      err: ""
    };
  }
  render() {
    return (
      <div className="gallery-body">
        {/* <button onClick((event: React.MouseEvent<HTMLElement>) => {this.setState(this.state.filter: true)}) className="filter">
          <p className="filter-text">filter</p>
        </button> */}
        <Filter />
        <div className="gallery-container">
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

// const Gallery = () => {
//   return (
//     <div className="gallery-body">
//       <button className="filter">
//         <p className="filter-text">filter</p>
//       </button>
//       <Filter />
//       <div className="gallery-container">
//         <div className="gallery-item">
//           <img src="https://via.placeholder.com/150" alt="placeholder" />
//           <div className="comment">
//             <p className="day">day #</p>
//             <p className="day-comment">comment if one</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Gallery;
