import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Days.scss";

type State = {
  listDays: Number[];
};
type Props = {};
class Days extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      listDays: [],
    };
  }

  componentDidMount() {
    let list = [];
    const startTime = "2020-03-19";
    let todaysDate = moment(new Date());
    let diffDays = todaysDate.diff(startTime, "days");
    while (list.length <= diffDays - 1) {
      let add: any = list.length + 1;
      list.push(add);
    }
    this.setState({ listDays: list });
  }
  render() {
    return (
      <div className="days-container">
        {this.state.listDays.map((day: Number) => {
          return (
            <Link key={day} to={`days/${day}`} className="day-square">
              {day}
            </Link>
          );
        })}
      </div>
    );
  }
}

export default Days;
