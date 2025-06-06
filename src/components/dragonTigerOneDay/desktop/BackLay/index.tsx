import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import { isMobile } from "../../../../utils/screenDimension";

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
      selectionId: item?.sid,
      min:item?.min,
      max:item?.max
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };
  const handleLock = (status: any, value: any) => {
    if (status != "ACTIVE") {
      return true;
    } else {
      return false;
    }
  };
  const renderItem = (item: any, _: number, type: any) =>
    type === "back" ? (
      
      <div
        className={`dtlsubTitle ${type}-BackGround ${
          handleLock(item?.gstatus, item?.b1) ? "suspended-1day" : ""
        }`}
        onClick={() =>
          !handleLock(item?.gstatus, item?.b1) && handleBet(item, "back")
        }
      >
        {item?.b1}
      </div>
    ) : (
      <div
        className={`dtlsubTitle ${type}-BackGround ${
          handleLock(item?.gstatus, item?.l1) ? "suspended-1day" : ""
        }`}
        onClick={() =>
          !handleLock(item?.gstatus, item?.l1) && handleBet(item, "lay")
        }
      >
        {item?.l1}
      </div>
    );
    
  return (
    <div className="w-100 bg-grey">
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
          className={isMobile ? "row-flex-mobile " : "w-100 d-sm-flex flex-row"}
          style={{ height: "30px" }}
        >
          <div className="dtlTitle" style={{background:"#F2F2F2"}}>
           
          </div>
          <div className="dtlsubTitle back-BackGround">Back</div>
          <div className="dtlsubTitle lay-BackGround">Lay</div>
        </div>
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
          style={{ height: "40px" }}
        >
          <div
            className="dtlTitle"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              lineHeight: 1,
              height: "40px" ,
              background:"#F2F2F2"
            }}
          >
            <span >Dragon</span>
            <span
              className={`f400 title-14 ${
                data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                    ]
                    ? JSON.parse(
                        data?.profitLoss[
                          `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                        ]
                      )["dragon"] > 0
                      ? "color-green"
                      : JSON.parse(
                          data?.profitLoss[
                            `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                          ]
                        )["dragon"] < 0
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
                  ? JSON.parse(
                      data?.profitLoss[
                        `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                      ]
                    )["dragon"]
                  : <br></br>
                : 0}
            </span>
          </div>
          {renderItem(matchOddsData?.[0], 0, "back")}
          {renderItem(matchOddsData?.[0], 1, "lay")}
        </div>
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
          style={{ height: "40px" }}
        >
          <div
            className="dtlTitle"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              lineHeight: 1,
              background:"#F2F2F2"
            }}
          >
            <span>Tiger</span>
            <span
              className={`f400 title-14 ${
                data?.profitLoss
                  ? data?.profitLoss[
                      `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                    ]
                    ? JSON.parse(
                        data?.profitLoss[
                          `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                        ]
                      )["tiger"] > 0
                      ? "color-green"
                      : JSON.parse(
                          data?.profitLoss[
                            `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                          ]
                        )["tiger"] < 0
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
                  ? JSON.parse(
                      data?.profitLoss[
                        `${data?.videoInfo?.mid}_${matchOddsData?.[0]?.sid}_card`
                      ]
                    )["tiger"]
                  : <br></br>
                : 0}
            </span>
          </div>
          {renderItem(matchOddsData?.[1], 2, "back")}
          {renderItem(matchOddsData?.[1], 3, "lay")}
        </div>
      </div>
    </div>
  );
};

export default BackLay;
