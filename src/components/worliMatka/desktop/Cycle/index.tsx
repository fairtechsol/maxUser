import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa"; // Using an info icon from react-icons
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import "../style.scss";

const Cycle = ({ data, odds }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedBoxes, setSelectedBoxes] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [betTeam, setBetTeam] = useState<string>("");

  // const handleBoxClick = (index: number) => {
  //   setSelectedBoxes((prev) => {
  //     const updatedBoxes = prev.includes(index)
  //       ? prev.filter((box) => box !== index)
  //       : prev.length < 2
  //       ? [...prev, index]
  //       : prev;

  //     // If two boxes are selected, automatically trigger the bet handling.
  //     if (updatedBoxes.length === 2) {
  //       handleBet(updatedBoxes);
  //     }

  //     return updatedBoxes;
  //   });
  // };

  // const handleBet = (selectedIndices: number[]) => {
  //   if (selectedIndices.length === 2) {
  //     const selectedItems = selectedIndices.map((i) => ({
  //       bettingType: "BACK",
  //       matchId: data?.id,
  //       odd: odds[i]?.rate, // Assuming odds is an array of objects
  //       stake: 0,
  //       matchBetType: "matchOdd",
  //       betOnTeam: odds[i]?.nat,
  //       name: odds[i]?.nat,
  //       bettingName: "Match odds",
  //       selectionId: odds[i]?.sid,
  //     }));

  //     selectedItems.forEach((team) => {
  //       dispatch(
  //         selectedBetAction({
  //           team,
  //           data,
  //         })
  //       );
  //     });

  //     setSelectedBoxes([]); // Reset selection after placing the bet
  //     setShowModal(false); // Close modal after bet is placed
  //   }
  // };

  
  const handleBet = () => {
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
    if (betTeam) {
      handleBet();
    }
  }, [betTeam]);

  useEffect(() => {
    if (odds?.gstatus === "0") {
      dispatch(selectedBetAction(""));
    }
  }, [odds?.gstatus]);

  const renderBox = (value: string, index: number) => (
    <div
      key={index}
      className={`worli-odd-box back ${
        betTeam.includes(value) ? "selected" : ""
      }`}
      onClick={() => {
        setBetTeam((p) => {
          if (p && p.length == 2) return p;
          p = p == "0" ? value + p : p + value;
          //p = p.split("").sort().join("");

          return p;
        });

        //handleBoxClick(index);
      }}
      // style={{
      //   backgroundColor: selectedBoxes.includes(index)
      //     ? "var(--bg-success)"
      //     : "",
      //   color: selectedBoxes.includes(index) ? "#fff" : "",
      // }}
    >
      <span className="worli-odd">{value}</span>
    </div>
  );

  return (
    <div className={`${odds?.gstatus == 0 ? "suspended-bo" : ""} worli-full`}>
      <div className="worli-box-title">
        <b>Cycle</b>
      </div>
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

      {/* Show the info icon when two boxes are selected */}
      {selectedBoxes.length === 2 && (
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
          You have selected two boxes. Do you want to place your bet?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary">Place Bet</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cycle;
