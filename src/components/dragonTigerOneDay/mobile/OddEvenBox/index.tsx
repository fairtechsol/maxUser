import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { ImClubs } from "react-icons/im";
import { GiSpades } from "react-icons/gi";
import { BiSolidHeart } from "react-icons/bi";
import { ImDiamonds } from "react-icons/im";
import isMobile from "../../../../utils/screenDimension";

const OddEven = ({ title1, title2, data, tigerData, dragonData }: any) => {
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
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
    console.log("team", team);
  };
  const tigerEvenOdd = tigerData?.slice(0, 2);
  const tigerRedBlack = tigerData?.slice(2, 4);
  const dragonEvenOdd = dragonData?.slice(0, 2);
  const dragonRedBlack = dragonData?.slice(2, 4);
  // console.log(dragonData, "first", tigerData);
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
      {item?.b1}
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
        <div className={isMobile ? 'row-flex-mobile' :"w-100 d-sm-flex flex-row"} style={{ height: "30px" }}>
          <div className="dtlTitle"> </div>
          <div className="dtlsubTitle back-BackGround">
            <span style={{ fontSize: "14px" }}>
              {title1 === "even" ? (
                "Even"
              ) : (
                <>
                  Red
                  <ImDiamonds color="#ff0000" size={12} />{" "}
                  <BiSolidHeart color="#ff0000" size={12} />
                </>
              )}
            </span>
          </div>
          <div className="dtlsubTitle back-BackGround">
            <span style={{ fontSize: "14px" }}>
              {title2 === "odd" ? (
                "Odd"
              ) : (
                <>
                  Black
                  <ImClubs color="#000000" size={11} />{" "}
                  <GiSpades color="#000000" size={11} />
                </>
              )}
            </span>
          </div>
        </div>
        <div className={isMobile ? 'row-flex-mobile' :"w-100 d-sm-flex flex-row"} style={{ height: "30px" }}>
          <div className="dtlTitle">Dragon </div>
          {/* <div
            className={`dtlsubTitle back-BackGround ${ title1 === "even" ?
              dragonEvenOdd?.[0]?.gstatus === "CLOSED" ||
              dragonEvenOdd?.[0]?.b1 === "0.00"
                ? "suspended"
                : ""
                :  dragonRedBlack?.[0]?.gstatus === "CLOSED" ||
                dragonRedBlack?.[0]?.b1 === "0.00"
                  ? "suspended"
                  : ""
            }`}
          >
            {title1 === "even"
              ? dragonEvenOdd?.[0]?.b1
              : dragonRedBlack?.[0]?.b1}
          </div>
          <div className={`dtlsubTitle back-BackGround ${ title2 === "odd" ?
              dragonEvenOdd?.[0]?.gstatus === "CLOSED" ||
              dragonEvenOdd?.[0]?.b1 === "0.00"
                ? "suspended"
                : ""
                :  dragonRedBlack?.[0]?.gstatus === "CLOSED" ||
                dragonRedBlack?.[0]?.b1 === "0.00"
                  ? "suspended"
                  : ""
            }`}>
            {title2 === "odd"
              ? dragonEvenOdd?.[1]?.b1
              : dragonRedBlack?.[1]?.b1}
          </div> */}
          {renderItem(
            title1 === "even"
              ? dragonEvenOdd?.[0]
              : dragonRedBlack?.[0],
            0
          )}
          {renderItem(
            title2 === "odd" ? dragonEvenOdd?.[1] : dragonRedBlack?.[1],
            0
          )}
        </div>
        <div className={isMobile ? 'row-flex-mobile' :"w-100 d-sm-flex flex-row"} style={{ height: "30px" }}>
          <div className="dtlTitle"> Tiger</div>
          {/* <div className={`dtlsubTitle back-BackGround ${ title1 === "even" ?
              tigerEvenOdd?.[0]?.gstatus === "CLOSED" ||
              tigerEvenOdd?.[0]?.b1 === "0.00"
                ? "suspended"
                : ""
                :  tigerRedBlack?.[0]?.gstatus === "CLOSED" ||
                tigerRedBlack?.[0]?.b1 === "0.00"
                  ? "suspended"
                  : ""
            }`}>
            {title1 === "even" ? tigerEvenOdd?.[0]?.b1 : tigerRedBlack?.[0]?.b1}
          </div>
          <div className={`dtlsubTitle back-BackGround ${ title2 === "odd" ?
              tigerEvenOdd?.[0]?.gstatus === "CLOSED" ||
              tigerEvenOdd?.[0]?.b1 === "0.00"
                ? "suspended"
                : ""
                :  tigerRedBlack?.[0]?.gstatus === "CLOSED" ||
                tigerRedBlack?.[0]?.b1 === "0.00"
                  ? "suspended"
                  : ""
            }`}>
            {title2 === "odd" ? tigerEvenOdd?.[1]?.b1 : tigerRedBlack?.[1]?.b1}
          </div> */}
          {renderItem(
            title1 === "even" ? tigerEvenOdd?.[0] : tigerRedBlack?.[0],
            0
          )}
          {renderItem(
            title2 === "odd" ? tigerEvenOdd?.[1] : tigerRedBlack?.[1],
            0
          )}
        </div>
      </div>
    </div>
  );
};

export default OddEven;
