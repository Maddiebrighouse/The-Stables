import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Days.scss";

type State = {
  listDays: number[];
};
type Props = {};
const Days = (props: Props, state: State) => {
  const [listDays, setListDays] = React.useState([]);

  useEffect(() => {
    let list: number[] = [];
    while (list.length <= 53 - 1) {
      let add: any = list.length + 1;
      list.push(add);
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
