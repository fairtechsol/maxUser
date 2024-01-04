import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MatchList from "../../components/home";
import { getMatchList } from "../../store/actions/match/matchListAction";
import { AppDispatch } from "../../store/store";

const Home = () => {
  const [matchType, setMatchType] = useState("cricket");

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getMatchList({
        matchType: matchType,
      })
    );
  }, [matchType]);

  return (
    <div>
      <MatchList setMatchType={setMatchType} />
    </div>
  );
};

export default Home;
