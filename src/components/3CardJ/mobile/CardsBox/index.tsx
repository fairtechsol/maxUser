import { useDispatch } from "react-redux";
import { useState } from "react";
import { AppDispatch } from "../../../../store/store";
import CommonCardImg from "../CommonCardImg";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const CardBox = ({ title, odds, data, cards, bgColor }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const [nat, setNat] = useState("");
  const handleBet = () => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: odds?.rate,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: title + " " + nat,
      name: title + " " + nat,
      bettingName: "Match odds",
      selectionId: odds?.sid,
    };
    if (nat !== "") {
      dispatch(
        selectedBetAction({
          team,
          data,
        })
      );
    }
  };

  const arCards = cards?.ar?.split(",");
  const brCards = cards?.br?.split(",");

  const handlock = () => {
    if (odds?.gstatus === "0") {
      if (nat !== "") {
        setNat("");
      }

      return "suspended";
    } else {
      return "";
    }
  };

  return (
    <div className={handlock()}>
      <div
        className={`abjcardContainer`}
        style={{ backgroundColor: bgColor, border: "0.5px solid #000" , display: "flex",flexDirection:"column"}}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "0.5px solid #000",
          }}
        >
          <span style={{ fontSize: "16px" }}>{title}</span>
        </div>
        <div
          className="p-3  "
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>{odds?.rate}</div>
          <CommonCardImg
            cardData={[
              "A",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "J",
              "Q",
              "K",
            ]}
            cardInfo={title === "Yes" ? arCards : brCards}
            handleBet={handleBet}
            data={data}
            setNat={setNat}
            nat={nat}
          />
        </div>
      </div>
    </div>
  );
};

export default CardBox;
