import React from "react";

import "./Filter.scss";

type Props = {};
type State = {
  active: boolean;
};
class Filter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
    this.state = {
      active: true,
    };
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  handleChange() {
    this.props.onActiveChange(true);
    this.toggleClass();
  }

  render() {
    const active = this.state.active;
    return (
      <div className="filter-container">
        <div className="order-container">
          <h1>order...</h1>
          <button
            className={active ? "strike strikeactive" : "strike"}
            onClick={() => {
              //this.toggleClass();
              this.handleChange();
            }}
          >
            newest to oldest
          </button>
          <br />
          <button
            className={this.state.active ? "strike" : "strike strikeactive"}
            onClick={() => {
              //this.toggleClass();
              this.handleChange();
            }}
          >
            oldest to newest
          </button>
        </div>
        {/* <div className="photo-container">
          <h1>photos of...</h1>
          <button className="strike">madeleine</button>
          <br />
          <button className="strike">zach</button>
          <br />
          <button className="strike">lowen</button>
          <br />
          <button className="strike">michael</button>
          <br />
          <button className="strike">buster</button>
          <br />
          <button className="strike">arnie</button>
        </div> */}
      </div>
    );
  }
}

export default Filter;
