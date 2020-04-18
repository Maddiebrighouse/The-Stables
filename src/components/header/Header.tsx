import * as React from "react";
import moment from "moment";

import "./Header.scss";

type Props = {};

type State = {
  days: String;
  hours: String;
  mins: String;
  sec: String;
};
class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      days: "",
      hours: "",
      mins: "",
      sec: "",
    };
  }

  componentDidMount() {
    setInterval(
      () =>
        this.setState({ hours: moment("08:00:00", "HH:mm:ss").fromNow(true) }),
      1000
    );
    setInterval(
      () => this.setState({ mins: moment().startOf("hour").fromNow(true) }),
      1000
    );
    setInterval(() => this.setState({ sec: moment().format("s") }), 1000);
  }

  render() {
    const startTime = "2020-03-19";
    let todaysDate = moment(new Date());
    let diffDays = todaysDate.diff(startTime, "days");
    return (
      <div className="header-container">
        <img
          className="hamburger"
          src="https://res.cloudinary.com/isolationstables/image/upload/v1587102067/Isolation/icons/menu_xamyfv.png"
        />
        <a href="/">
          <h1 className="title">Isolation at The Stables</h1>
        </a>
        <div className="time-container">
          <h3>{`${diffDays} days`}</h3>
          <h3>{this.state.hours}</h3>
          <h3>{this.state.mins}</h3>
          <h3>{` and ${this.state.sec} second`}</h3>
        </div>
        <img
          className="misty"
          src="https://res.cloudinary.com/isolationstables/image/upload/v1587075325/Isolation/misty/Misty-glitter_vehvmg.jpg"
          alt="Image of a horse laten"
        />
      </div>
    );
  }
}

export default Header;
