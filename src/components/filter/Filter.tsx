import React from "react";

import "./Filter.scss";

type Props = {};
type State = {
  active: boolean;
  personFilter: boolean;
  busterActive: boolean;
  madeleineActive: boolean;
  zachActive: boolean;
  ravidActive: boolean;
  arnieActive: boolean;
  loewnActive: boolean;
  michaelActive: boolean;
  history: number[];
};
const Filter = (props: Props, state: State) => {
  const [active, setActive] = React.useState(true);
  const [personFilter, setPersonFilter] = React.useState(false);
  const [busterActive, setBuster] = React.useState(false);
  const [madeleineActive, setMadeleine] = React.useState(false);
  const [zachActive, setZach] = React.useState(false);
  const [ravidActive, setRavid] = React.useState(false);
  const [arnieActive, setArnie] = React.useState(false);
  const [loewnActive, setLoewn] = React.useState(false);
  const [michaelActive, setMichael] = React.useState(false);
  const [history, setHistory] = React.useState([]);

  function toggleClass() {
    const currentState = active;
    setActive(!currentState);
  }

  function handleChange(filter: any) {
    props.onActiveChange(filter);
    toggleClass();
  }

  React.useEffect(() => {
    if (personFilter || history.length > 2) {
      switch (history[history.length - 2]) {
        case 1:
          setMadeleine(false);
          break;
        case 2:
          setZach(false);
          break;
        case 3:
          setLoewn(false);
          break;
        case 4:
          setMichael(false);
          break;
        case 5:
          setBuster(false);
          break;
        case 6:
          setArnie(false);
          break;
        case 7:
          setRavid(false);
          break;
      }
      setPersonFilter(false);
    }
  });
  return (
    <div className="filter-container">
      <div className="order-container">
        <h1>order...</h1>
        <button
          className={active ? "strike strikeactive" : "strike"}
          onClick={() => {
            handleChange(true);
          }}
        >
          newest to oldest
        </button>
        <br />
        <button
          className={active ? "strike" : "strike strikeactive"}
          onClick={() => {
            handleChange(true);
          }}
        >
          oldest to newest
        </button>
      </div>
      <div className="photo-container">
        <h1>photos of...</h1>
        <button
          className={madeleineActive ? "strike strikeactive" : "strike"}
          onClick={() => {
            handleChange("Madeleine");
            setMadeleine(true);
            setPersonFilter(true);
            history.push(1);
          }}
        >
          madeleine
        </button>
        <br />
        <button
          className={zachActive ? "strike strikeactive" : "strike"}
          onClick={() => {
            handleChange("Zach");
            setZach(true);
            setPersonFilter(true);
            history.push(2);
          }}
        >
          zach
        </button>
        <br />
        <button
          className={loewnActive ? "strike strikeactive" : "strike"}
          onClick={() => {
            handleChange("Lowen");
            setLoewn(true);
            setPersonFilter(true);
            history.push(3);
          }}
        >
          loewn
        </button>
        <br />
        <button
          className={michaelActive ? "strike strikeactive" : "strike"}
          onClick={() => {
            handleChange("Michael");
            setMichael(true);
            setPersonFilter(true);
            history.push(4);
          }}
        >
          michael
        </button>
        <br />
        <button
          className={busterActive ? "strike strikeactive" : "strike"}
          onClick={() => {
            handleChange("Buster");
            setBuster(true);
            setPersonFilter(true);
            history.push(5);
          }}
        >
          buster
        </button>
        <br />
        <button
          className={arnieActive ? "strike strikeactive" : "strike"}
          onClick={() => {
            handleChange("Arnie");
            setActive(true);
            setPersonFilter(true);
            history.push(6);
          }}
        >
          arnie
        </button>
        <br />
        <button
          className={ravidActive ? "strike strikeactive" : "strike"}
          onClick={() => {
            handleChange("Ravid");
            setRavid(true);
            setPersonFilter(true);
            history.push(7);
          }}
        >
          ravid
        </button>
      </div>
    </div>
  );
};

export default Filter;
