import { useState } from "react";
import { BiSolidHeart } from "react-icons/bi";
import { GiSpades } from "react-icons/gi";
import { ImClubs, ImDiamonds } from "react-icons/im";
import { IoInformationCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import isMobile from "../../../../utils/screenDimension";
import SmoothDropdownModal from "../minMaxModal";

const CardBox = ({ dragonData, tigerData, data }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [modelOpen, setModelOpen] = useState(false);
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
  };
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
        handleLock(item?.gstatus, item?.b1) ? "lock" : ""
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
            : 0
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
          marginLeft: "5px",
        }}
      >
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
        >
          <div className="dtlTitle">
            {" "}
            <div style={{ width: "30%", textAlign: "start" }}>
              <span className="minmaxi">
                <IoInformationCircle
                  color="#ffc742"
                  onClick={() => setModelOpen(!modelOpen)}
                />
                <SmoothDropdownModal
                  min={dragonData?.[0]?.max}
                  max={dragonData?.[0]?.min}
                  show={modelOpen}
                  setShow={() => setModelOpen(false)}
                />
              </span>
            </div>
          </div>
          <div className="dtlsubTitle">
            <GiSpades color="#000000" />
          </div>
          <div className="dtlsubTitle">
            <BiSolidHeart color="#ff0000" />
          </div>
          <div className="dtlsubTitle">
            <ImClubs color="#000000" />
          </div>
          <div className="dtlsubTitle">
            <ImDiamonds color="#ff0000" />
          </div>
        </div>
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
        >
          <div className="dtlTitle">Dragon </div>
          {renderItem(dragonData?.[4])}
          {renderItem(dragonData?.[5])}
          {renderItem(dragonData?.[7])}
          {renderItem(dragonData?.[6])}
        </div>
        <div
          className={isMobile ? "row-flex-mobile" : "w-100 d-sm-flex flex-row"}
        >
          <div className="dtlTitle"> Tiger</div>
          {renderItem(tigerData?.[4])}
          {renderItem(tigerData?.[5])}
          {renderItem(tigerData?.[7])}
          {renderItem(tigerData?.[6])}
        </div>
      </div>
    </div>
  );
};

export default CardBox;
