import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import "../style.scss";

const Card64 = ({ odds, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [clicked, setClicked] = useState<string>("");

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
      setSelectedBox(null);
      setClicked("");
    }
  }, [odds?.gstatus, dispatch]);

  const renderBox = (value: string, index: number) => (
    <div
      key={index}
      className={`worli-odd-box back ${clicked == value ? "selected" : ""}`}
      onClick={() => {
        value == "0" ? "" : setClicked(value);
        return value == "0"
          ? ""
          : value == "64CHART"
          ? handleBet(value)
          : handleBet("64 - " +value );
      }}
    >
      <span className="worli-odd">{value}</span>
    </div>
  );

  return (
    <div
      className={`worlibox sp ${odds?.gstatus === "0" ? "suspended-box" : ""}`}
    >
      <div className="worli-box-title">
        <b>140</b>
      </div>
      <div className="worli-left">
        <div className="worli-box-row">
          {["1", "2", "3", "4", "5"].map((value, index) =>
            renderBox(value, index)
          )}
        </div>
        <div className="worli-box-row">
          {["6", "7", "8", "9", "0"].map((value, index) =>
            renderBox(value, index + 5)
          )}
        </div>
      </div>
      <div className="worli-right">
        <div className="worli-box-row">{renderBox("64CHART", 10)}</div>
      </div>

      {/* Info Icon */}
      {selectedBox !== null && (
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

export default Card64;
