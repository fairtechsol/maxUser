import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MatchList from "../../components/home";
import { expertSocketService } from "../../socketManager";
import { getMatchList } from "../../store/actions/match/matchListAction";
import { AppDispatch } from "../../store/store";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const [matchType, setMatchType] = useState("cricket");

  const getMatchListService = () => {
    dispatch(
      getMatchList({
        matchType: matchType,
      })
    );
  };

  useEffect(() => {
    expertSocketService.match.matchAdded(getMatchListService);
  }, []);

  useEffect(getMatchListService, [matchType]);

  return (
    <div>
      <MatchList setMatchType={setMatchType} />
    </div>
  );
};

export default Home;
