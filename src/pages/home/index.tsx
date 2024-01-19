import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MatchList from "../../components/home";
import { expertSocketService, socketService } from "../../socketManager";
import { getMatchList } from "../../store/actions/match/matchListAction";
import { AppDispatch } from "../../store/store";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const [matchType, setMatchType] = useState("cricket");

  const getMatchListService = () => {
    try {
      dispatch(
        getMatchList({
          matchType: matchType,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      expertSocketService.match.matchAdded(getMatchListService);
      socketService.userBalance.matchResultDeclared(getMatchListService);
      socketService.userBalance.matchResultUnDeclared(getMatchListService);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(getMatchListService, [matchType]);

  return (
    <div>
      <MatchList setMatchType={setMatchType} />
    </div>
  );
};

export default Home;
