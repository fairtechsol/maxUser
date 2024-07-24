// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../../store/store";
// import CommonCardImg from "../CommonCardImg";
// import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import "./style.scss";

const CardBox = ({ 
  // title, data, cards,
  odds }: any) => {

  // const dispatch: AppDispatch = useDispatch();

  // const handleBet = (item: any) => {
  //   let team = {
  //     bettingType: "BACK",
  //     matchId: data?.id,
  //     odd: item?.rate,
  //     stake: 0,
  //     matchBetType: "matchOdd",
  //     betOnTeam: item?.nat,
  //     name: item?.nat,
  //     bettingName: "Match odds",
  //     selectionId: item?.sid,
  //   };
  //   dispatch(
  //     selectedBetAction({
  //       team,
  //       data,
  //     })
  //   );
  // };
  // const arCards = cards?.ar?.split(",");
  // const brCards = cards?.br?.split(",");
  return (
    <>
      <div
        className="abjcardContainer"
        style={{ backgroundColor:"#72bbef", border: "0.5px solid #fff" }}
      >
        <div
          style={{
            width: "14%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
            paddingTop:"10px",
            paddingBottom:"10px"
          }}
        >
          <span className="style" >{odds==="L1"?1:6}</span>
        </div>
        <div
          style={{
            width: "14%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
          }}
        >
          <span className="style" >{odds==="L1"?2:7}</span>
        </div>
        <div
          style={{
            width: "14%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
          }}
        >
          <span className="style" >{odds==="L1"?3:8}</span>
        </div>
        <div
          style={{
            width: "14%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
          }}
        >
          <span className="style" >{odds==="L1"?4:9}</span>
        </div>
        <div
          style={{
            width: "14%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
          }}
        >
          <span className="style" >{odds==="L1"?5:0}</span>
        </div>
        <div
          style={{
            width: "15%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
          }}
        >
          <span >{odds==="L1"?"Line1":"Line2"}</span>
        </div>
        <div
          style={{
            width: "15%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "0.5px solid #fff",
          }}
        >
          <span >{odds==="L1"?"ODD":"EVEN"}</span>
        </div>
      </div>
    </>
  );
};

export default CardBox;
