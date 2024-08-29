import MarqueeHeader from "../../commonComponent/marquee";
import "./style.scss"

const Bookmaker=({title,box})=>{

    return(
        <>
        <div className="bookmakerContainer">
            <div className="bookmakerTitle">
               <span className="bookmakerTitleTxt">{title}</span>
            </div>


            <div className="bookmakerBackLayTab">
                <div className="bookmakerMinMaxBox">
                    <span className="bookmakerMinMax">Min:100 Max:50000</span>
                </div>
                <div className={box===6?"bookmaker1BackLayBoxContainer":"bookmaker2BackLayBoxContainer"}>
                    <div className={box===6?"bookmaker1BackBoxTab":"bookmaker2BackBoxTab"}>
                        <span className="bookmakerBackTxt">Back</span>
                    </div>
                    <div className={box===6?"bookmaker1LayBoxTab":"bookmaker2LayBoxTab"}>
                        <span className="bookmakerBackTxt">Lay</span>
                    </div>
                    {box ===6 && (<div className="bookmakerEmptyBox"></div>)}
                </div>
            </div>

            <div className="bookmakerTeamTab">
              <div className="bookmakerTeam">
                <span className="bookmakerTeamTxt">Team A Play</span>
              </div>
              <div className={box===6?"bookmaker1RateBox":"bookmaker2RateBox"}>
              {box ===6 && (<div className="bookmakerBackBox back3Background">
                    <span className="bookmakerRate1Box">22.56</span>
                    <span className="bookmakerRate2Box">50000</span>
                </div>)}
                {box ===6 && ( <div className="bookmakerBackBox back2Background">
                    <span className="bookmakerRate1Box">22.56</span>
                    <span className="bookmakerRate2Box">50000</span>
                </div>)}
                <div className="bookmakerBackBox back1Background">
                    <span className="bookmakerRate1Box">22.56</span>
                    <span className="bookmakerRate2Box">50000</span>
                </div>
                <div className="bookmakerBackBox lay1Background">
                    <span className="bookmakerRate1Box">22.56</span>
                    <span className="bookmakerRate2Box">50000</span>
                </div>
                {box ===6 && (<div className="bookmakerBackBox lay2Background">
                    <span className="bookmakerRate1Box">22.56</span>
                    <span className="bookmakerRate2Box">50000</span>
                </div>)}
                {box ===6 && (<div className="bookmakerBackBox lay3Background">
                    <span className="bookmakerRate1Box">22.56</span>
                    <span className="bookmakerRate2Box">50000</span>
                </div>)}
              </div>
            </div>
             
            <div className="bookmakerTeamTab">
              <div className="bookmakerTeam">
                <span className="bookmakerTeamTxt">Team B Play</span>
              </div>
              <div className={box===6?"bookmaker1RateBox":"bookmaker2RateBox"}>
              {box ===6 && (<div className="bookmakerBackBox back3Background">
                    <span className="bookmakerRate1Box">22.56</span>
                    <span className="bookmakerRate2Box">50000</span>
                </div>)}
                {box ===6 && ( <div className="bookmakerBackBox back2Background">
                    <span className="bookmakerRate1Box">22.56</span>
                    <span className="bookmakerRate2Box">50000</span>
                </div>)}
                <div className="bookmakerBackBox back1Background">
                    <span className="bookmakerRate1Box">22.56</span>
                    <span className="bookmakerRate2Box">50000</span>
                </div>
                <div className="bookmakerBackBox lay1Background">
                    <span className="bookmakerRate1Box">22.56</span>
                    <span className="bookmakerRate2Box">50000</span>
                </div>
                {box ===6 && (<div className="bookmakerBackBox lay2Background">
                    <span className="bookmakerRate1Box">22.56</span>
                    <span className="bookmakerRate2Box">50000</span>
                </div>)}
                {box ===6 && (<div className="bookmakerBackBox lay3Background">
                    <span className="bookmakerRate1Box">22.56</span>
                    <span className="bookmakerRate2Box">50000</span>
                </div>)}
              </div>
            </div>
             
            <div className="bookmakerRemarkTab"> 
            <div className="remark-content">
            Virtual Tennis Bookmaker And Set Winner Bet Started In Our Exchange
            </div>
            </div>
           
        </div>
        </>
    )
}
export default Bookmaker;