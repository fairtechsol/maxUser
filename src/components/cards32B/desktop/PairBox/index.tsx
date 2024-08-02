import { useState } from "react";
import { IoInformationCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import isMobile from "../../../../utils/screenDimension";
import SmoothDropdownModal from "../minMaxModal";

const PairBox = ({ matchOddsData, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [modelOpen, setModelOpen] = useState(false);
  const min = matchOddsData?.[0]?.min;
  const max = matchOddsData?.[0]?.max;
  const handleBet = (item: any, type: any) => {
    let team = {
      bettingType: type === "back" ? "BACK" : "LAY",
      matchId: data?.id,
      odd: type === "back" ? item?.b1 : item?.l1,
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
  const handleLock = (status: any, value: any) => {
    if (status != "ACTIVE" || value === "0.00") {
      return true;
    } else {
      return false;
    }
  };
  const renderItem = (item: any, index: number, type: any) =>
    type === "back" ? (
      <div
        key={index}
        className={`dtlsubTitle ${type}-BackGround ${
          handleLock(item?.gstatus, item?.b1) ? "suspended" : ""
        }`}
        onClick={() =>
          !handleLock(item?.gstatus, item?.b1) && handleBet(item, "back")
        }
      >
        {item?.b1}
      </div>
    ) : (
      <div
        key={index}
        className={`dtlsubTitle ${type}-BackGround ${
          handleLock(item?.gstatus, item?.l1) ? "suspended" : ""
        }`}
        onClick={() =>
          !handleLock(item?.gstatus, item?.l1) && handleBet(item, "lay")
        }
      >
        {item?.l1}
      </div>
    );
  return (
    <div className="w-100">
      <div
        style={{
          width: "100%",
          marginTop: "5%",
          display: "flex",
          flexDirection: "column",
          border: "0.3px solid #c7c8ca",
          // marginLeft: "5px",
        }}
      >
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
          style={{ height: "30px" }}
        >
          <div className="dtlTitle">
            {isMobile ? (
              <>
                <span style={{ fontWeight: "400" }}>
                  Min:{min} Max:{max}
                </span>
              </>
            ) : (
              <div style={{ width: "45%", textAlign: "start" }}>
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
            )}
          </div>
          <div className="dtlsubTitle back-BackGround">Back</div>
          <div className="dtlsubTitle lay-BackGround">Lay</div>
        </div>
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
        >
          <span className="dtlTitle lh-1">
            <div className="profitLoss-Text">
              <span>Any 3 Card Black</span>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                      ]
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                        ] > 0
                        ? "color-green"
                        : data?.profitLoss[
                            `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                          ] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                      ]
                    : 0
                  : 0}
              </span>
            </div>
          </span>
          {renderItem(matchOddsData?.[0], 0, "back")}
          {renderItem(matchOddsData?.[0], 1, "lay")}
        </div>
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
        >
          <span className="dtlTitle lh-1">
            <div className="profitLoss-Text">
              <span>Any 3 Card Red</span>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${matchOddsData?.[1]?.sid}_card`
                      ]
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${matchOddsData?.[1]?.sid}_card`
                        ] > 0
                        ? "color-green"
                        : data?.profitLoss[
                            `${data?.videoInfo?.mid}_${matchOddsData?.[1]?.sid}_card`
                          ] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${matchOddsData?.[1]?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${matchOddsData?.[1]?.sid}_card`
                      ]
                    : 0
                  : 0}
              </span>
            </div>
          </span>
          {renderItem(matchOddsData?.[1], 2, "back")}
          {renderItem(matchOddsData?.[1], 3, "lay")}
        </div>
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
        >
          <span className="dtlTitle lh-1">
            <div className="profitLoss-Text">
              <span>Two Black Two Red</span>
              <span
                className={`title-14 f400 ${
                  data?.profitLoss
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${matchOddsData?.[2]?.sid}_card`
                      ]
                      ? data?.profitLoss[
                          `${data?.videoInfo?.mid}_${matchOddsData?.[2]?.sid}_card`
                        ] > 0
                        ? "color-green"
                        : data?.profitLoss[
                            `${data?.videoInfo?.mid}_${matchOddsData?.[2]?.sid}_card`
                          ] < 0
                        ? "color-red"
                        : ""
                      : ""
                    : ""
                }`}
              >
                {data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${matchOddsData?.[2]?.sid}_card`
                    ]
                    ? data?.profitLoss[
                        `${data?.videoInfo?.mid}_${matchOddsData?.[2]?.sid}_card`
                      ]
                    : 0
                  : 0}
              </span>
            </div>
          </span>
          {renderItem(matchOddsData?.[2], 2, "back")}
          {renderItem(matchOddsData?.[2], 3, "lay")}
        </div>
      </div>
    </div>
  );
};

export default PairBox;
