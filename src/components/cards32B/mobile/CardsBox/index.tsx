import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";

const CardBox = ({ odds, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: item?.b1,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nation,
      name: item?.nation,
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
  const renderItem = (item: any, index: number) => (
    <div
      key={index}
      className={`dtlsubTitle back-BackGround ${
        handleLock(item?.gstatus, item?.b1) ? "suspended" : ""
      }`}
      onClick={() => !handleLock(item?.gstatus, item?.b1) && handleBet(item)}
    >
      <span style={{ fontFamily: "auto", fontSize: "48px" ,color:"#333333"}}>
        {index + 1 === 10 ? "0" : index + 1}
      </span>
      <span
        style={{ fontSize: "14px", fontWeight: "400",zIndex:"100" }}
        className={`title-14 f400 ${
          data?.profitLoss
            ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
              ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`] >
                0
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
          ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
            ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
            : <br></br>
          : 0}
      </span>
    </div>
  );
  return (
    <div className="w-100">
      <div
        style={{
          width: "100%",
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          border: "0.3px solid #c7c8ca",
          marginLeft: "px",
        }}
      >
        <div className="w-100 d-sm-flex flex-row" style={{ height: "30px" }}>
         
          <div style={{ width: "100%", textAlign: "center",fontWeight:"bold" }}>
            {odds?.[0]?.b1 == "0.00"?0:odds?.[0]?.b1}
          </div>
        </div>
      </div>
      <div
        className="w-100 d-sm-flex flex-row"
        style={{ height: "auto", display: "flex",color:"#333333" }}
      >
        {odds?.slice(0, 5)?.map((item: any, index: number) => {
          return <>{renderItem(item, index)}</>;
        })}
      </div>
      <div
        className="w-100 d-sm-flex flex-row"
        style={{ height: "auto", display: "flex",color:"#333333" }}
      >
        {odds?.slice(5, 10)?.map((item: any, index: number) => {
          return <>{renderItem(item, index + 5)}</>;
        })}
      </div>
    </div>
  );
};

export default CardBox;
