import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MatchList from "../../components/home";
import { getMatchList } from "../../store/actions/match/matchListAction";
import { AppDispatch } from "../../store/store";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getMatchList());
  }, []);

  return (
    <div>
      <MatchList />
    </div>
  );
};

export default Home;
