import "./style.scss";
import { AppDispatch } from "../../../../store/store";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const DynamicTable = ({ odds, data, back, playerNum }: any) => {
  const dispatch: AppDispatch = useDispatch();

  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: item?.rate,
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
    console.log("team", item);
  };

  const array = odds?.slice(playerNum[0], playerNum[1]);

  const groupedData = (array || [])?.reduce((acc: any, item: any) => {
    const { nat, sid, rate, gstatus } = item;
    if (!acc[nat]) {
      acc[nat] = { nat, entries: [] };
    }
    const suffix = String.fromCharCode(65 + acc[nat].entries.length);
    acc[nat].entries?.push({ nat: `${nat} ${suffix}`, sid, rate, gstatus });
    return acc;
  }, {});

  const result = Object.values(groupedData);
  return (
    <div className="card32-table-container-m">
        <div className="card32-table-row" style={{ lineHeight: 2 }}>
        <div style={{ width: "50%" }}></div>
      {playerNum[0] === 0 &&  ( <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="card32-table-item back" style={{ width: "50%" }}>
            PLAYER A
          </div>
          <div className="card32-table-item back" style={{ width: "50%" }}>
            PLAYER B
          </div>
        </div>)}
      </div>
      {result &&
        result?.map((item: any, index: number) => {
          return (
            <div
              className="card32-table-row"
              style={{ lineHeight: 1 }}
              key={index + playerNum[0]}
            >
              <div
                style={{
                  width: "50%",
                  padding: "8px",
                  border: "0.1px solid #fff",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: "14px", fontWeight: "bolder" }}>
                  {item?.nat}
                </span>
                <span>
                  {/* {data?.profitLoss
              ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                ? JSON.parse(
                    data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                  )[player1Key]
                : 0
              : 0} */}
                </span>
              </div>
              <div
                className={
                  item?.entries?.[0]?.gstatus === "0" 
                    ? "suspended"
                    : ""
                }
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "row",
                  cursor: "pointer",
                }}
              >
                <div
                  className="card32-table-item back"
                  style={{ width: "50%" }}
                  onClick={() =>
                    item?.entries?.[0]?.gstatus === "0" 
                      ? null
                      : handleBet(item?.entries?.[0])
                  }
                >
                  <span className="f12-b">{item?.entries?.[0]?.rate}</span>
                </div>
                <div
                  className="card32-table-item back"
                  style={{ width: "50%" }}
                  onClick={() =>
                    item?.entries?.[0]?.gstatus === "0" 
                      ? null
                      : handleBet(item?.entries?.[1])
                  }
                >
                  <span className="f12-b">{item?.entries?.[1]?.rate}</span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DynamicTable;
