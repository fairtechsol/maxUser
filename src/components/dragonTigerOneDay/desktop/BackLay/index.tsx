import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CommonButtonBox from "../CommonButtonBox";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const BackLay = ({ matchOddsData, data }: any) => {
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
    console.log("team", team);
  };

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
                  className="w-100 d-sm-flex flex-row"
                  style={{ height: "30px"}}
                >
                  <div className="dtlTitle"> </div>
                  <div className="dtlsubTitle">Back</div>
                  <div className="dtlsubTitle">Lay</div>
                </div>
                <div
                  className="w-100 d-sm-flex flex-row"
                  style={{ height: "30px" }}
                >
                  <div className="dtlTitle">Dragon </div>
                  <div className="dtlsubTitle">11</div>
                  <div className="dtlsubTitle">22</div>
                </div>
                <div
                  className="w-100 d-sm-flex flex-row"
                  style={{ height: "30px" }}
                >
                  <div className="dtlTitle"> Tiger</div>
                  <div className="dtlsubTitle">44</div>
                  <div className="dtlsubTitle">55</div>
                </div>
    </div>
    </div>
  );
};

export default BackLay;
