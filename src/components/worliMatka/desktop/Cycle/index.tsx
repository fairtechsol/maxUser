import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../store/store";
import { isMobile } from "../../../../utils/screenDimension";
import WorliClearBox from "../../mobile/WorliClearBox";
import "../style.scss";

const Cycle = ({ data, odds }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [betTeam, setBetTeam] = useState<string>("");
  const [mobileBox, setMobileBox] = useState(false);
  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const handleBet = () => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: "140",
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: betTeam,
      name: betTeam + " Cycle",
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
    if (betTeam && !isMobile) {
      handleBet();
    } else if (betTeam && isMobile && mobileBox) {
      handleBet();
    }
  }, [betTeam, mobileBox]);

  useEffect(() => {
    if (odds?.gstatus === "0") {
      dispatch(selectedBetAction(""));
      setBetTeam("");

      setMobileBox(false);
    }
  }, [odds?.gstatus]);

  useEffect(() => {
    if (selectedBet == null) {
      setBetTeam("");
      setMobileBox(false);
    }
  }, [selectedBet]);

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
          return p;
        });
      }}
    >
      <span className="worli-odd">{value}</span>
    </div>
  );

  const handleClear = () => {
    setBetTeam("");
    setMobileBox(false);
  };

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

      {isMobile && betTeam?.length > 0 && (
        <WorliClearBox
          game="Cycle"
          team={betTeam}
          zeros={""}
          setBox={setMobileBox}
          handleClear={handleClear}
          disabled={betTeam?.length < 2}
        />
      )}
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
