import * as React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
import { withStyles, Theme, makeStyles } from "@material-ui/core/styles";
import "./Header.scss";

type Props = {};

type State = {
  days: String;
  hours: String;
  mins: String;
  sec: String;
};

const CustomTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: "white",
    color: "black",
    border: "1px solid black",
    fontFamily: "Astloch",
    boxShadow: "0 6px 4px -7px black",
    fontSize: 24,
  },
}))(Tooltip);

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
    // Social Distancing
    let todaysDate = moment(new Date());
    const socialStartTime = moment([2020, 5, 11]);
    let SocialDiffDays = socialStartTime.diff(todaysDate, "days");
    // Lock Down
    const startTime = moment([2020, 3, 19]);
    const lockDownEnd = moment([2020, 5, 11]);
    let diffDays = lockDownEnd.diff(startTime, "days");
    return (
      <div className="header-container">
        <Link to={"/"}>
          <h1 className="title">Isolation at The Stables</h1>
        </Link>
        <CustomTooltip title="Of Lock-Down" placement="bottom-start" arrow>
          <div className="time-container">
            <h3>{`${diffDays} days`}</h3>
            <h3>12 hours</h3>
            <h3>32 minutes</h3>
            <h3> and 23 second</h3>
          </div>
        </CustomTooltip>
        <CustomTooltip
          title="Of Social Distancing"
          placement="bottom-start"
          arrow
        >
          <div className="time-container">
            <h3>{`${SocialDiffDays} days`}</h3>
            <h3>{this.state.hours}</h3>
            <h3>{this.state.mins}</h3>
            <h3>{` and ${this.state.sec} second`}</h3>
          </div>
        </CustomTooltip>
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
