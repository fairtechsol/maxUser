import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { handleRoundId } from "../../../utils/formatMinMax";
const CasinoHead = ({activeTab, setActiveTab, setShow} : any) => {
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const { placedBets } = useSelector((state: RootState) => state.bets);
  return (
    <div className="horseRacingTabHeader-m">
      <div>
        <span style={{textTransform:"uppercase"}} className="title-12 px-2 fbold">{dragonTigerDetail?.name=="Casino Meter"?"CASINO METER":dragonTigerDetail?.name}</span>
       {dragonTigerDetail?.name === "Queen" || dragonTigerDetail?.name === "3 CARDS JUDGEMENT"  || dragonTigerDetail?.name === "INSTANT WORLI" ? "" : <span className="title-12 f400" onClick={() => setShow(true)}>
          Rules
        </span>}
      </div>
      <div className="dt20header">
        <div className="dt20subheader1">
          <div
            style={{
              borderTop: !activeTab ? "2px solid white" : "none",
            }}
          >
            <span className="headfirst" onClick={() => setActiveTab(false)}>
              GAME
            </span>
          </div>
          <span style={{ fontSize: "18px" }}> | </span>
          <div
            style={{
              borderTop: activeTab ? "2px solid white" : "none",
            }}
          >
            <span className="headfirst" onClick={() => setActiveTab(true)}>
              PLACED BET({placedBets?.length || 0})
            </span>
          </div>
        </div>
        <div className="dt20subheader2">
          <span>
            {" "}
            {dragonTigerDetail?.videoInfo
                    ? `Round ID:  ${handleRoundId(
                        dragonTigerDetail?.videoInfo?.mid
                      )}`
                    : ""}
          </span>
          {/* <span>
                  {dragonTigerDetail?.videoInfo
                    ? `Round ID:  ${dragonTigerDetail?.videoInfo?.mid}`
                    : ""}
                </span> */}
        </div>
      </div>
    </div>
  );
};

export default CasinoHead;
