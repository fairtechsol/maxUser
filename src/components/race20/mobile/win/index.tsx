import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const WinBox = ({ odds, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
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
      min:parseFloat(item?.min),
      max:parseFloat(item?.max)
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };
  const handleLock = (item: any) => {
    if (item?.gstatus != "ACTIVE" || item?.b1 === "0.00") {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <div className="winContainer-m border-bottom-0" style={{ border: "1px solid #c7c8ca"}}>
        <div className="subwinContainer">
          {odds?.map((item: any) => {
            return (
              <div className="win-mainRateBox" key={item?.sid}>
                <div>
                  <span className="f600">{item?.nat}</span>
                </div>
                <div
                  className={`win-rateBox back-BackGround flex-column ${
                    handleLock(item) ? "suspended" : ""
                  }`}
                  onClick={() => (handleLock(item) ? null : handleBet(item))}
                >
                  <span className="rate-box">{item?.b1}</span>{" "}
                </div>
                <span
                  className={`casino-volume f500 mt-0 ${
                    data?.profitLoss
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${item?.sid}_card`
                        ]
                        ? data?.profitLoss[
                            `${data?.videoInfo?.mid}_${item?.sid}_card`
                          ] > 0
                          ? "color-green"
                          : data?.profitLoss[
                              `${data?.videoInfo?.mid}_${item?.sid}_card`
                            ] < 0
                          ? "color-red"
                          : ""
                        : ""
                      : ""
                  }`}
                >
                  {data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${item?.sid}_card`
                      ]
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${item?.sid}_card`
                        ]
                      :  <br></br>
                    : 0}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default WinBox;
