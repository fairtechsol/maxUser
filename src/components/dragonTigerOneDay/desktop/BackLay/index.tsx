import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import isMobile from "../../../../utils/screenDimension";

const BackLay = ({ matchOddsData, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
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
      selectionId: "1",
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
    console.log("team", team);
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
  // console.log('first',matchOddsData)
  return (
    <div className="w-100">
      <div
        style={{
          width: "100%",
          marginTop: "5%",
          display: "flex",
          flexDirection: "column",
          border: "0.3px solid #c7c8ca",
          marginLeft: "5px",
        }}
      >
        <div className={isMobile ? 'row-flex-mobile' : "w-100 d-sm-flex flex-row"} style={{ height: "30px" }}>
          <div className="dtlTitle"> </div>
          <div className="dtlsubTitle back-BackGround">Back</div>
          <div className="dtlsubTitle lay-BackGround">Lay</div>
        </div>
        <div className={isMobile ? 'row-flex-mobile' :"w-100 d-sm-flex flex-row"} style={{ height: "30px" }}>
          <div className="dtlTitle">Dragon </div>
          {renderItem(matchOddsData?.[0], 0, "back")}
          {renderItem(matchOddsData?.[0], 1, "lay")}
          {/* <div className={`dtlsubTitle back-BackGround ${matchOddsData?.[0]?.gstatus==="ACTIVE" || matchOddsData?.[0]?.b1 != "0.00" ?"":"suspended"}`}>{matchOddsData?.[0]?.b1}</div>
                  <div className={`dtlsubTitle lay-BackGround ${matchOddsData?.[0]?.gstatus==="ACTIVE" || matchOddsData?.[0]?.l1 != "0.00" ?"":"suspended"}`}>{matchOddsData?.[0]?.l1}</div> */}
        </div>
        <div className={isMobile ? 'row-flex-mobile' :"w-100 d-sm-flex flex-row"} style={{ height: "30px" }}>
          <div className="dtlTitle"> Tiger</div>
          {renderItem(matchOddsData?.[1], 2, "back")}
          {renderItem(matchOddsData?.[1], 3, "lay")}
          {/* <div className={`dtlsubTitle back-BackGround ${matchOddsData?.[1]?.gstatus==="ACTIVE" || matchOddsData?.[1]?.b1 != "0.00" ?"":"suspended"}`}>{matchOddsData?.[1]?.b1}</div>
                  <div className={`dtlsubTitle lay-BackGround ${matchOddsData?.[1]?.gstatus==="ACTIVE" || matchOddsData?.[1]?.l1 != "0.00" ?"":"suspended"}`}>{matchOddsData?.[1]?.l1}</div> */}
        </div>
      </div>
    </div>
  );
};

export default BackLay;
