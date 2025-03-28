import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import "../style.scss";

const Abr = ({ odds, data }) => {
  const dispatch: AppDispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [clicked, setClicked] = useState<string>("");

  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const handleBet = (betTeam: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: "140",
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: betTeam,
      name: betTeam,
      bettingName: "Match odds",
      selectionId: odds?.sid,
      min: data?.videoInfo?.min,
      max: data?.videoInfo?.max,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  useEffect(() => {
    if (odds?.gstatus === "0") {
      dispatch(selectedBetAction(""));
      setClicked("");
    }
  }, [odds?.gstatus, dispatch]);

  useEffect(() => {
    if (selectedBet == null) {
      setClicked("");
    }
  }, [selectedBet]);

  const renderBox = (value: string, index: number) => (
    <div
      key={index}
      className={`worli-odd-box back ${clicked == value ? "selected" : ""}`}
      onClick={() => {
        value == "0" ? "" : setClicked(value);
        return value == "0" ? "" : handleBet("ABR - " + value);
      }}
    >
      <span className="worli-odd">{value}</span>
    </div>
  );

  return (
    <div
      className={`worlibox abr ${odds?.gstatus === "0" ? "suspended-box" : ""}`}
    >
      <div className="worli-box-title">
        <b>140</b>
      </div>
      <div className="worli-left">
        <div className="worli-box-row">
          {["A", "B", "R"].map((value, index) => renderBox(value, index))}
        </div>
        <div className="worli-box-row">
          {["AB", "AR", "BR"].map((value, index) => renderBox(value, index))}
        </div>
      </div>
      <div className="worli-right">
        <div className="worli-box-row">{renderBox("ABR", 10)}</div>
        <div className="worli-box-row">{renderBox("ABR CUT", 10)}</div>
      </div>

      {/* Info Icon */}
      {clicked !== "" && (
        <div className="info-icon" onClick={() => setShowModal(true)}>
          <FaInfoCircle size={24} />
        </div>
      )}

      {/* React Bootstrap Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Place Bet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have selected a box. Do you want to place your bet?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Abr;
