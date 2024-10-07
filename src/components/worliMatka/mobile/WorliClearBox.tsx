import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";

const WorliClearBox = ({ team, zeros, setBox }) => {
  return (
    <div className="d-xl-none worli-clear-box container-fluid container-fluid-5 mt-2">
      <div className="row row5 align-items-center">
        <div className="col-6 text-center">
          <span className="worli-place-card">{team + zeros} Pana</span>
        </div>
        <div className="col-6 text-end pe-3">
          <button className="btn btn-danger btn-sm me-1">Clear</button>
          <button
            className={"btn  btn-success btn-sm"}
            onClick={() => setBox(true)}
            disabled={team?.length + zeros?.length < 3}
          >
            Placebet
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorliClearBox;
