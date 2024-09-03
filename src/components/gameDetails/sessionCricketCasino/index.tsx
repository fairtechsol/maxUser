import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import isMobile from "../../../utils/screenDimension";
import "./style.scss";
import { selectedBetAction } from "../../../store/actions/match/matchListAction";
import { FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";

const SessionCricketCasino = ({ title, data, detail }) => {
  const dispatch: AppDispatch = useDispatch();
  const [marketArr, setMarketArr] = useState<any>(data);
  const handlePlaceBet = (
    odds: any,
    type: any,
    betTeam: any,
    status: any,
    value: any,
    item: any,
    tno: any,
    index:any
  ) => {
    if (status != "") {
      return false;
    }
    let team = {
      betOnTeam: betTeam,
      rate: odds,
      type: type,
      stake: 0,
      teamA: detail?.teamA,
      teamB: detail?.teamB,
      teamC: detail?.teamC,
      betId: data?.id,
      name: data?.RunnerName,
      eventType: detail?.matchType,
      matchId: detail?.id,
      percent: value,
      matchBetType: "session",
      betPlaceIndex: tno,
      mid: item?.mid?.toString(),
      teamName:  index + " Number" ,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  useEffect(() => {
    if (!data?.section || !Array.isArray(data.section)) {
      const defaultArray = Array.from(
        { length: 10 },
        (_, i) => `Element ${i + 1}`
      );

      const newData = {
        ...data,
        section: defaultArray,
      };

      setMarketArr(newData);
    }
  }, []);

  return (
    <>
      <div className="sessionNormalContainer">
        <div className="sessionNormalTitle">
          <span className="sessionNormalTitleTxt">{title}</span>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            {marketArr?.section?.map((item: any, index: any) => {
              return (
                <div className="sessionRateContainer" key={index}>
                  <div className="sessionRateName">
                    <span className="f-size16">{index} Number</span>
                  </div>
                  <div className="sessionCCRateBoxContainer">
                    {(item?.gstatus !== "" ) && (
                      <div className="suspended-overlayRates">
                        <FaLock color="#fff" />
                      </div>
                    )}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRight: "1px solid #c7c8ca",
                      }}
                    >
                      <div
                        className={`sessionRateBox back1Background`}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handlePlaceBet(
                            item?.odds?.[0]?.odds,
                            "Back",
                            "Back",
                            item?.gstatus,
                            item?.odds?.[0]?.size,
                            item,
                            item?.odds?.[0]?.tno,
                            index
                          )
                        }
                      >
                        <span
                          className={`${
                            !isMobile ? "f-size18" : "f-size12"
                          } sessionRate1Box`}
                        >
                          {item?.odds?.[0]?.odds ?? "-"}
                        </span>
                        <span
                          className={`${
                            !isMobile ? "f-size14" : "f-size12"
                          } sessionRate2Box`}
                        >
                          {item?.odds?.[0]?.size}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default SessionCricketCasino;
