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
    let endDate = moment("2020-09-03");
    let diffDays = endDate.diff(startTime, "days");
    let noPhotoDays = 145;

    while (list.length <= 53 - 1) {
      let add: any = list.length + 1;
      list.push(add);
    }
    for (let i = 0; i < diffDays; i++) {
      list.push(noPhotoDays++);
    }

    let listFourth: number[] = [ 331, 332, 333, 337];
    let fourthlLockDown = 337;
    let fourthLockStart = "2021-02-28";
    let todaysDate = moment();
    let diffDates = todaysDate.diff(fourthLockStart, "days");
  
    while (listFourth.length -4 < diffDates){
      fourthlLockDown = fourthlLockDown + 1
      listFourth.push(fourthlLockDown);
    }
    setListDays(list.concat(listFourth));
  }, []);

  console.log(listDays);
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
