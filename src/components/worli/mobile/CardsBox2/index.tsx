import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";

const CardBox2 = ({ data, odds }: any) => {
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
  };

  return (
    <>
      <div
        className="abjcardContainer"
        style={{ backgroundColor: "#72bbef", border: "0.5px solid #fff" }}
      >
        <div className="d-flex w-100 ">
          <div
            style={{
              width: "25%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRight: "0.5px solid #fff",
              flexDirection: "column",
            }}
            onClick={() =>
              handleBet({
                sid: data.worli.sid,
                rate: "9",
                nat: odds === "L1" ? "Line1 Single" : "Line2 Single",
              })
            }
          >
            <span className="fs-6 fw-bold ">Line1</span>
            <div>1|2|3|4|5</div>
          </div>
          <div
            style={{
              width: "25%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRight: "0.5px solid #fff",
              flexDirection: "column",
            }}
            onClick={() =>
              handleBet({
                sid: data.worli.sid,
                rate: "9",
                nat: odds === "L1" ? "ODD Single" : "EVEN Single",
              })
            }
          >
            <span className="fs-6 fw-bold">ODD</span>
            <div>1|3|5|7|9</div>
          </div>
          <div
            style={{
              width: "25%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRight: "0.5px solid #fff",
              flexDirection: "column",
            }}
            onClick={() =>
              handleBet({
                sid: data.worli.sid,
                rate: "9",
                nat: odds === "L1" ? "Line1 Single" : "Line2 Single",
              })
            }
          >
            <span className="fs-6 fw-bold ">Line2</span>
            <div>6|7|8|9|0</div>
          </div>

          <div
            style={{
              width: "25%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRight: "0.5px solid #fff",
              flexDirection: "column",
            }}
            onClick={() =>
              handleBet({
                sid: data.worli.sid,
                rate: "9",
                nat: odds === "L1" ? "ODD Single" : "EVEN Single",
              })
            }
          >
            <span className="fs-6 fw-bold">EVEN</span>
            <div>2|4|6|8|0</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardBox2;
