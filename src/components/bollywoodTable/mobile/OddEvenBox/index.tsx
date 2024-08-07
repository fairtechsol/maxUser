import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import { useState } from "react";
import CommonButtonBox from "../CommonButtonBox";
import { IoInformationCircle } from "react-icons/io5";
import SmoothDropdownModal from "../../mobile/minMaxModal";
const OddEven = ({ data, card, odds }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const min = odds?.[0]?.min;
  const max = odds?.[0]?.max;

  const [modelOpen, setModelOpen] = useState(false);
  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: item?.b1,
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

  return (
    <div
      className="oddEvenContaine"
      style={{ background: "#EEEEEE", width: "100%" }}
    >
      {card ? (
        <>
          <div style={{ width: "98%", textAlign: "end" }}>
            <span className="minmaxi">
              <IoInformationCircle
                color="#ffc742"
                onClick={() => setModelOpen(!modelOpen)}
              />
              <SmoothDropdownModal
                min={min}
                max={max}
                show={modelOpen}
                setShow={() => setModelOpen(false)}
              />
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CommonButtonBox
              value1={odds?.[0]?.b1}
              value2={odds?.[0]?.nat}
              value3={
                data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                    ]
                  : 0
              }
              width={"45%"}
              handleBet={handleBet}
              lock={odds?.[0]?.gstatus === "SUSPENDED" || odds?.[0]?.b1 === "0.00" ? true : false}
              data={odds?.[0]}
            />
            <CommonButtonBox
              value1={odds?.[1]?.b1}
              value2={odds?.[1]?.nat}
              value3={
                data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                    ]
                  : 0
              }
              width={"45%"}
              handleBet={handleBet}
              lock={odds?.[1]?.gstatus === "SUSPENDED" || odds?.[1]?.b1 === "0.00" ? true : false}
              data={odds?.[1]}
            />
          </div>
          {/* <div style={{ textAlign: "end" }}>
            <span style={{ fontWeight: "bolder" }}>Min:</span>
            <span>{min}</span>
            <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>
              Max:
            </span>
            <span>{max}</span>
          </div> */}
        </>
      ) : (
        <>
        <div style={{ width: "98%", textAlign: "end" }}>
            <span className="minmaxi">
              <IoInformationCircle
                color="#ffc742"
                onClick={() => setModelOpen(!modelOpen)}
              />
              <SmoothDropdownModal
                min={min}
                max={max}
                show={modelOpen}
                setShow={() => setModelOpen(false)}
              />
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CommonButtonBox
              value1={odds?.[0]?.b1}
              value2={odds?.[0]?.nat}
              value3={
                data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[0]?.sid}_card`
                    ]
                  : 0
              }
              width={"45%"}
              handleBet={handleBet}
              lock={odds?.[0]?.gstatus === "SUSPENDED" || odds?.[0]?.b1 === "0.00" ? true : false}
              data={odds?.[0]}
            />
            <CommonButtonBox
              value1={odds?.[1]?.b1}
              value2={odds?.[1]?.nat}
              value3={
                data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${odds?.[1]?.sid}_card`
                    ]
                  : 0
              }
              width={"45%"}
              handleBet={handleBet}
              lock={odds?.[1]?.gstatus === "SUSPENDED" || odds?.[1]?.b1 === "0.00" ? true : false}
              data={odds?.[1]}
            />
          </div>
          {/* <div style={{ textAlign: "end" }}>
            <span style={{ fontWeight: "bolder" }}>Min:</span>
            <span>{min}</span>
            <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>
              Max:
            </span>
            <span>{max}</span>
          </div> */}
        </>
      )}
    </div>
  );
};

export default OddEven;
