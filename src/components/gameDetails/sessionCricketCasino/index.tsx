import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {isLap, isMobile} from "../../../utils/screenDimension";
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
    if(odds === 0){
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
  const formatNumber = (num:any) => {
    if (num >= 1000 && num < 1000000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else if (num >= 100000) {
      return (num / 100000).toFixed(1).replace(/\.0$/, '') + 'L';
    }
    return num.toString();
  };
  const handlePrice = (rate: any) => {
    if (rate && rate != 0) {
      return rate;
    } else {
      return "-";
    }
  };


  return (
    <>
      <div className="sessionNormalContainer" style={{marginTop:isMobile?"":"10px"}}>
        <div className="sessionNormalTitle">
          <span className="sessionNormalTitleTxt" style={{fontSize:isMobile?"13px":"15px"}}>{title}</span>
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
            <div className="sessionCasinoMinMax" style={{borderBottom:"1px solid #c7c8ca"}}>
             <div style={{width:"85%",backgroundColor:"#f2f2f2"}}>
              <span className={`sessionMinBox`} style={{marginLeft:"1%"}}>Min:{formatNumber(marketArr?.min)} Max:{formatNumber(marketArr?.max)}</span>
             </div>
             <div className="sessionRateBox back1Background" style={{width:isLap?"61px":!isMobile?"81px":"18%"}}>
              <span className={`f-size16 sessionBackTxt`}>Back</span>
             </div>
            </div>
            {marketArr?.section?.map((item: any, index: any) => {
              return (
                <div className="sessionRateContainer" key={index}>
                  <div className="sessionRateName">
                    <span className={isMobile?"f-size13":"f-size14"} style={{fontWeight:"400"}}>{index} Number</span>
                  </div>
                  <div className="sessionCCRateBoxContainer" style={{width:isLap?"61px":!isMobile?"81px":"" }}>
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
                        style={{ cursor: "pointer"}}
                        onClick={() =>
                          handlePlaceBet(
                            item?.odds?.[0]?.odds,
                            "Back",
                            "Back",
                            item?.gstatus,
                            item?.odds?.[0]?.odds,
                            item,
                            item?.odds?.[0]?.tno,
                            index
                          )
                        }
                      >
                        <span
                          className={`${
                            !isMobile ? "f-size18" : isLap ? "f-size16":"f-size15"
                          } sessionRate1Box`}
                        >
                          {handlePrice(item?.odds?.[0]?.odds) ?? "-"}
                        </span>
                        <span
                          className={`${
                            !isMobile ? "f-size12" : "f-size11"
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
