import React, { useEffect, useState } from "react";
import "../style.scss";
import { AppDispatch } from "../../../../store/store";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { FaInfoCircle } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";

const CardSp = ({ data, odds }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: item?.rate,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nat,
      name: item?.nat,
      bettingName: "Match odds",
      selectionId: item?.sid,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
    setSelectedBox(null); // Reset selection after placing the bet
    setShowModal(false);
  };

  useEffect(() => {
    if (odds?.gstatus === "0") {
      dispatch(selectedBetAction(""));
    }
  }, [odds?.gstatus]);

  const handleBoxClick = (index: number) => {
    setSelectedBox(index);
  };

  const renderBox = (value: string, index: number) => (
    <div
      key={index}
      className={`worli-odd-box back ${
        selectedBox === index ? "selected" : ""
      }`}
      onClick={() => handleBoxClick(index)}
    >
      <span className="worli-odd">{value}</span>
    </div>
  );

  return (
    <div className={`worlibox sp ${odds?.gstatus === "0" ? "suspended-box" : ""}`}>
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
        <div className="worli-box-row">{renderBox("SP ALL", 10)}</div>
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

export default CardSp;
