import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AppDispatch, RootState } from "../../../../store/store";
import CommonCardImg from "../CommonCardImg";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { useEffect } from "react";

const CardBox = ({ title, odds, data, cards, bgColor, betType }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const [nat, setNat] = useState("");
  const handleBet = () => {
    let team = {
      bettingType: betType,
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

  useEffect(() => {
    if (selectedBet === null) {
      setNat("");
    }
  }, [selectedBet]);

  useEffect(() => {
    if (odds?.gstatus === "0") {
      dispatch(selectedBetAction(null));
      setNat("");
    } else {
    }
  }, [odds?.gstatus === "0"]);

  return (
    <div className={handlock()}>
      <div
        className={`abjcardContainer`}
        style={{ backgroundColor: bgColor, border: "0.5px solid #000" }}
      >
        <div
          style={{
            width: "20%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #000",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: "12px",
              display: "flex",
              justifyContent: "center",
            }}
            className={`${
              data?.profitLoss
                ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${title === "Yes" ? 1 : 2}_card`
                  ]
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${title === "Yes" ? 1 : 2}_card`
                    ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                        `${data?.videoInfo?.mid}_${
                          title === "Yes" ? 1 : 2
                        }_card`
                      ] < 0
                    ? "color-red"
                    : ""
                  : ""
                : ""
            }`}
          >
            {data?.profitLoss ? (
              data?.profitLoss[
                `${data?.videoInfo?.mid}_${title === "Yes" ? 1 : 2}_card`
              ] ? (
                data?.profitLoss[
                  `${data?.videoInfo?.mid}_${title === "Yes" ? 1 : 2}_card`
                ]
              ) : (
                <br></br>
              )
            ) : (
              0
            )}
          </span>
        </div>
        <div
          className="p-3  "
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>
            {odds?.rate}
          </div>
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
            title={title}
          />
        </div>
      </div>
    </div>
  );
};

export default CardBox;
