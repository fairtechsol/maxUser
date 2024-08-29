import "./style.scss"

const MatchOdd=({title})=>{

    return(
        <>
        <div className="matchOddContainer">
            <div className="matchOddTitle">
               <span className="matchOddTitleTxt">{title}</span>
            </div>


            <div className="matchOddBackLayTab">
                <div className="matchOddMinMaxBox">
                    <span className="matchOddMinMax">Min:100 Max:50000</span>
                </div>
                <div className="matchOddBackLayBoxContainer">
                    <div className="matchOddBackBoxTab">
                        <span className="matchOddBackTxt">Back</span>
                    </div>
                    <div className="matchOddLayBoxTab">
                        <span className="matchOddBackTxt">Lay</span>
                    </div>
                    <div className="matchOddEmptyBox"></div>
                </div>
            </div>

            <div className="matchOddTeamTab">
              <div className="matchOddTeam">
                <span className="matchOddTeamTxt">Team A Play</span>
              </div>
              <div className="matchOddRateBox">
                <div className="matchOddBackBox back3Background">
                    <span className="matchOddRate1Box">22.56</span>
                    <span className="matchOddRate2Box">50000</span>
                </div>
                <div className="matchOddBackBox back2Background">
                    <span className="matchOddRate1Box">22.56</span>
                    <span className="matchOddRate2Box">50000</span>
                </div>
                <div className="matchOddBackBox back1Background">
                    <span className="matchOddRate1Box">22.56</span>
                    <span className="matchOddRate2Box">50000</span>
                </div>
                <div className="matchOddBackBox lay1Background">
                    <span className="matchOddRate1Box">22.56</span>
                    <span className="matchOddRate2Box">50000</span>
                </div>
                <div className="matchOddBackBox lay2Background">
                    <span className="matchOddRate1Box">22.56</span>
                    <span className="matchOddRate2Box">50000</span>
                </div>
                <div className="matchOddBackBox lay3Background">
                    <span className="matchOddRate1Box">22.56</span>
                    <span className="matchOddRate2Box">50000</span>
                </div>
              </div>
            </div>
             
            <div className="matchOddTeamTab">
              <div className="matchOddTeam">
                <span className="matchOddTeamTxt">Team B Play</span>
              </div>
              <div className="matchOddRateBox">
                <div className="matchOddBackBox back3Background">
                    <span className="matchOddRate1Box">48.69</span>
                    <span className="matchOddRate2Box">50000</span>
                </div>
                <div className="matchOddBackBox back2Background">
                    <span className="matchOddRate1Box">48.69</span>
                    <span className="matchOddRate2Box">50000</span>
                </div>
                <div className="matchOddBackBox back1Background">
                    <span className="matchOddRate1Box">48.69</span>
                    <span className="matchOddRate2Box">50000</span>
                </div>
                <div className="matchOddBackBox lay1Background">
                    <span className="matchOddRate1Box">48.69</span>
                    <span className="matchOddRate2Box">50000</span>
                </div>
                <div className="matchOddBackBox lay2Background">
                    <span className="matchOddRate1Box">48.69</span>
                    <span className="matchOddRate2Box">50000</span>
                </div>
                <div className="matchOddBackBox lay3Background">
                    <span className="matchOddRate1Box">48.69</span>
                    <span className="matchOddRate2Box">50000</span>
                </div>
              </div>
            </div>

            <div className="matchOddTeamTab">
              <div className="matchOddTeam">
                <span className="matchOddTeamTxt">The Draw</span>
              </div>
              <div className="matchOddRateBox">
                <div className="matchOddBackBox back3Background">
                    <span className="matchOddRate1Box">48.69</span>
                    <span className="matchOddRate2Box">50000</span>
                </div>
                <div className="matchOddBackBox back2Background">
                    <span className="matchOddRate1Box">48.69</span>
                    <span className="matchOddRate2Box">50000</span>
                </div>
                <div className="matchOddBackBox back1Background">
                    <span className="matchOddRate1Box">48.69</span>
                    <span className="matchOddRate2Box">50000</span>
                </div>
                <div className="matchOddBackBox lay1Background">
                    <span className="matchOddRate1Box">48.69</span>
                    <span className="matchOddRate2Box">50000</span>
                </div>
                <div className="matchOddBackBox lay2Background">
                    <span className="matchOddRate1Box">48.69</span>
                    <span className="matchOddRate2Box">50000</span>
                </div>
                <div className="matchOddBackBox lay3Background">
                    <span className="matchOddRate1Box">48.69</span>
                    <span className="matchOddRate2Box">50000</span>
                </div>
              </div>
            </div>
           
        </div>
        </>
    )
}
export default MatchOdd;