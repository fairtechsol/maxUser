import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonCardImg from "../CommonCardImg";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { useEffect } from "react";
import "./style.scss";

const CardBox = ({ title, data, cards, odds }: any) => {
  const dispatch: AppDispatch = useDispatch();

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
  };
  const arCards = cards?.ar?.split(",");
  const brCards = cards?.br?.split(",");

  useEffect(() => {
    if (data?.worli?.gstatus === "0") {
      dispatch(selectedBetAction(""));
    }
  }, [data?.worli?.gstatus]);

  return (
    <>
      <div
        className={
          data?.worli?.gstatus == 0
            ? "suspended abjcardContainer"
            : " abjcardContainer"
        }
        style={{ backgroundColor: "#72bbef", border: "0.5px solid #fff" }}
      >
        <div
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
            paddingTop: "17px",
            paddingBottom: "17px",
          }}
          onClick={() =>
            handleBet({
              sid: data.worli.sid,
              rate: "9",
              nat: odds === "L1" ? "1 Single" : "6 Single",
            })
          }
        >
          <span className="style">{odds === "L1" ? 1 : 6}</span>
        </div>
        <div
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
          }}
          onClick={() =>
            handleBet({
              sid: data.worli.sid,
              rate: "9",
              nat: odds === "L1" ? "2 Single" : "7 Single",
            })
          }
        >
          <span className="style">{odds === "L1" ? 2 : 7}</span>
        </div>
        <div
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
          }}
          onClick={() =>
            handleBet({
              sid: data.worli.sid,
              rate: "9",
              nat: odds === "L1" ? "3 Single" : "8 Single",
            })
          }
        >
          <span className="style">{odds === "L1" ? 3 : 8}</span>
        </div>
        <div
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
          }}
          onClick={() =>
            handleBet({
              sid: data.worli.sid,
              rate: "9",
              nat: odds === "L1" ? "4 Single" : "9 Single",
            })
          }
        >
          <span className="style">{odds === "L1" ? 4 : 9}</span>
        </div>
        <div
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
          }}
          onClick={() =>
            handleBet({
              sid: data.worli.sid,
              rate: "9",
              nat: odds === "L1" ? "5 Single" : "0 Single",
            })
          }
        >
          <span className="style">{odds === "L1" ? 5 : 0}</span>
        </div>
      </div>
    </>
  );
};

export default CardBox;
