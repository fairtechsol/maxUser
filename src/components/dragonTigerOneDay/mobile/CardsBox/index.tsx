import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { ImClubs } from "react-icons/im";
import { GiSpades } from "react-icons/gi";
import { BiSolidHeart } from "react-icons/bi";
import { ImDiamonds } from "react-icons/im";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import isMobile from "../../../../utils/screenDimension";

const CardBox = ({ dragonData, tigerData, data }: any) => {
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
          marginTop: "2%",
          display: "flex",
          flexDirection: "column",
          border: "0.3px solid #c7c8ca",
          marginLeft: "5px",
        }}
      >
        <div className={isMobile ? 'row-flex-mobile' :"w-100 d-sm-flex flex-row"} style={{ height: "30px" }}>
          <div className="dtlTitle"> </div>
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
        <div className={isMobile ? 'row-flex-mobile' : "w-100 d-sm-flex flex-row"} style={{ height: "30px" }}>
          <div className="dtlTitle">Dragon </div>
          {renderItem(dragonData?.[4], 4)}
          {renderItem(dragonData?.[5], 5)}
          {renderItem(dragonData?.[7], 7)}
          {renderItem(dragonData?.[6], 6)}
        </div>
        <div className={isMobile ? 'row-flex-mobile' : "w-100 d-sm-flex flex-row"} style={{ height: "30px" }}>
          <div className="dtlTitle"> Tiger</div>
          {renderItem(tigerData?.[4], 4)}
          {renderItem(tigerData?.[5], 5)}
          {renderItem(tigerData?.[7], 7)}
          {renderItem(tigerData?.[6], 6)}
        </div>
      </div>
    </div>
  );
};

export default CardBox;
