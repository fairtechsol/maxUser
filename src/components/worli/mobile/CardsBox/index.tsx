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
          data?.worli?.gstatus == 0 ? "suspended abjcardContainer" : " abjcardContainer"
        }
        style={{ backgroundColor: "#72bbef", border: "0.5px solid #9e9e9e" }}
      >
        <div
          style={{
            width: "14%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #9e9e9e",
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
            width: "14%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #9e9e9e",
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
            width: "14%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #9e9e9e",
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
            width: "14%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #9e9e9e",
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
            width: "14%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #9e9e9e",
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
        <div
          style={{
            width: "15%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #9e9e9e",
            flexDirection: "column",
          }}
          onClick={() =>
            handleBet({
              sid: data.worli.sid,
              rate: "9",
              nat: odds === "L1" ? "Line1 Single" : "Line2 Single",
            })
          }
        >
          <span className="fs-6 fw-bold ">
            {odds === "L1" ? "Line1" : "Line2"}
          </span>
          {odds === "L1" ? <div>1|2|3|4|5</div> : <div>6|7|8|9|0</div>}
        </div>
        <div
          style={{
            width: "15%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #9e9e9e",
            flexDirection: "column",
          }}
          onClick={() =>
            handleBet({
              sid: data.worli.sid,
              rate: "9",
              nat: odds === "L1" ? "ODD Single" : "EVEN Single",
            })
          }
        >
          <span className="fs-6 fw-bold">{odds === "L1" ? "ODD" : "EVEN"}</span>
          {odds === "L1" ? <div>1|3|5|7|9</div> : <div>2|4|6|8|0</div>}
        </div>
      </div>
    </>
  );
};

export default CardBox;
