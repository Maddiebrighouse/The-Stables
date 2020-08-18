import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Days.scss";

type State = {
  listDays: number[];
};
type Props = {};
const Days = (props: Props, state: State) => {
  const [listDays, setListDays] = React.useState([]);

  useEffect(() => {
    let list: number[] = [];
    const startTime = "2020-08-12";
    let todaysDate = moment(new Date());
    let diffDays = todaysDate.diff(startTime, "days");
    let noPhotoDays = 145;

    while (list.length <= 53 - 1) {
      let add: any = list.length + 1;
      list.push(add);
    }
    for (let i = 0; i < diffDays; i++) {
      list.push(noPhotoDays++);
    }
    setListDays(list);
  }, []);

  return (
    <div className="days-container">
      {listDays.map((day: Number, i) => {
        return (
          <Link key={i} to={`days/${day}`} className="day-square">
            {day}
          </Link>
        );
      })}
    </div>
  );
};

export default Days;
