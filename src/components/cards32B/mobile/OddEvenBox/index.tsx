import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";

const OddEven = ({ data, odds }: any) => {
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
      min: parseFloat(item?.min),
      max: parseFloat(item?.max),
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  const player8 = odds?.slice(0, 2);
  const player9 = odds?.slice(2, 4);
  const player10 = odds?.slice(4, 6);
  const player11 = odds?.slice(6, 8);
  const handleLock = (status: any, value: any) => {
    if (status != "ACTIVE" || value === "0.00") {
      return true;
    } else {
      return false;
    }
  };
  const renderItem = (item: any) => (
    <div
      className={`dtlsubTitle back-BackGround ${
        handleLock(item?.gstatus, item?.b1) ? "suspended-box2" : ""
      }`}
      onClick={() => !handleLock(item?.gstatus, item?.b1) && handleBet(item)}
    >
      {item?.b1}
      <span
        className={`title-12 f400 ${
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
        style={{ zIndex: "100" }}
      >
        {data?.profitLoss ? (
          data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`] ? (
            data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
          ) : (
            <br></br>
          )
        ) : (
          0
        )}
      </span>
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
          marginLeft: "5px",
        }}
      >
        <div
          className="w-100 d-sm-flex flex-row "
          style={{ display: "flex", lineHeight: "2" }}
        >
          <div className="dtlTitle lh-lg" />
          <div className="dtlsubTitle back-BackGround lh-lg ">
            <span style={{ fontSize: "12px" }}>Even</span>
          </div>
          <div className="dtlsubTitle back-BackGround lh-lg">
            <span style={{ fontSize: "12px" }}>Odd</span>
          </div>
        </div>
        <div className="w-100 d-sm-flex flex-row" style={{ display: "flex" }}>
          <div className="dtlTitle title-12">Player 8</div>
          {renderItem(player8?.[1])}
          {renderItem(player8?.[0])}
        </div>
        <div className="w-100 d-sm-flex flex-row" style={{ display: "flex" }}>
          <div className="dtlTitle title-12">Player 9</div>
          {renderItem(player9?.[1])}
          {renderItem(player9?.[0])}
        </div>
        <div className="w-100 d-sm-flex flex-row" style={{ display: "flex" }}>
          <div className="dtlTitle title-12">Player 10</div>
          {renderItem(player10?.[1])}
          {renderItem(player10?.[0])}
        </div>
        <div className="w-100 d-sm-flex flex-row" style={{ display: "flex" }}>
          <div className="dtlTitle title-12">Player 11</div>
          {renderItem(player11?.[1])}
          {renderItem(player11?.[0])}
        </div>
      </div>
    </div>
  );
};

export default OddEven;
