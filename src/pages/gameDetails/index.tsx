import GameDetails from "../../components/gameDetails";
import { GameData, MatchOdds, SessionMarketData } from "./index.json";

const GameDetail = () => {
  return <GameDetails data={{
    matchOdds:MatchOdds(),
    bookmaker:GameData(),
    session:SessionMarketData()
  }} />;
};

export default GameDetail;
