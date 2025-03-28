import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import "./style.scss";

const WorliClearBox = ({
  game,
  team,
  zeros,
  setBox,
  handleClear,
  disabled,
}) => {
  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );
  useEffect(() => {
    if (!selectedBet) {
      setBox(false);
    }
  }, [selectedBet]);

  return (
    <div className="d-xl-none worli-clear-box container-fluid container-fluid-5 mt-2">
      <div className="row row5 align-items-center">
        <div className="col-6 text-center">
          <span className="worli-place-card">
            {team + zeros} {" " + game}
          </span>
        </div>
        <div className="col-6 text-end pe-3">
          <button
            className="btn btn-danger btn-sm me-1"
            onClick={() => handleClear()}
          >
            Clear
          </button>
          <button
            className={"btn  btn-success btn-sm"}
            onClick={() => setBox(true)}
            disabled={disabled}
          >
            Placebet
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorliClearBox;
