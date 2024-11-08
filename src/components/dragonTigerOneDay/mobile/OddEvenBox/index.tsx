import { BiSolidHeart } from "react-icons/bi";
import { GiSpades } from "react-icons/gi";
import { ImClubs, ImDiamonds } from "react-icons/im";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import {isMobile} from "../../../../utils/screenDimension";
import { useEffect } from "react";
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
  const tigerEvenOdd = tigerData?.slice(0, 2);
  const tigerRedBlack = tigerData?.slice(2, 4);
  const dragonEvenOdd = dragonData?.slice(0, 2);
  const dragonRedBlack = dragonData?.slice(2, 4);
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
        handleLock(item?.gstatus, item?.b1) ? "suspended-1day" : ""
      }`}
      onClick={() => !handleLock(item?.gstatus, item?.b1) && handleBet(item)}
    >
      {item?.b1}
      <span
        className={`f400 title-14 ${
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
        style={{ zIndex: "111" }}
      >
        {data?.profitLoss
          ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
            ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
            : ""
          : ""}
      </span>
    </div>
  );

  useEffect(() => {
    if (
      data?.dragonData?.[0]?.gstatus === "SUSPENDED" ||
      data?.dragonData?.[0]?.b1 === "0.00"
    ) {
      dispatch(selectedBetAction(""));
    }
  }, [
    data?.dragonData?.[0].gstatus,
    data?.dragonData?.[0]?.b1,
  ]);


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
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
        >
          <div className="dtlTitle" style={{ fontWeight: "400",background:"#F2F2F2" }}>
            {/* Min:{" "}
            {title1 === "even"
              ? dragonEvenOdd?.[0]?.min
              : dragonRedBlack?.[0]?.min}{" "}
            Max:{" "}
            {title1 === "even"
              ? dragonEvenOdd?.[0]?.max
              : dragonRedBlack?.[0]?.max} */}
          </div>
          <div className="dtlsubTitle back-BackGround p-1">
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
        <div
         style={{ height: "42px" }}
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
        >
          <div className="dtlTitle" style={{background:"#F2F2F2"}}>Dragon </div>
          {renderItem(
            title1 === "even" ? dragonEvenOdd?.[0] : dragonRedBlack?.[0]
          )}
          {renderItem(
            title2 === "odd" ? dragonEvenOdd?.[1] : dragonRedBlack?.[1]
          )}
        </div>
        <div
         style={{ height: "42px" }}
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
        >
          <div className="dtlTitle" style={{background:"#F2F2F2"}}> Tiger</div>
          {renderItem(
            title1 === "even" ? tigerEvenOdd?.[0] : tigerRedBlack?.[0]
          )}
          {renderItem(
            title2 === "odd" ? tigerEvenOdd?.[1] : tigerRedBlack?.[1]
          )}
        </div>
      </div>
    </div>
  );
};

export default OddEven;
