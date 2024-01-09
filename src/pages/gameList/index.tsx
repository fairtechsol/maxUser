import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../components/commonComponent/loader";
import DesktopMatchList from "../../components/home/matchList/desktop";
import SportsFilters from "../../components/home/sportsFilters";
import { expertSocketService } from "../../socketManager";
import { getMatchList } from "../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../store/store";
import isMobile from "../../utils/screenDimension";

const GameList = () => {
  const { loading } = useSelector((state: RootState) => state.match.matchList);

  const { id } = useParams();

  const getMatchListService = () => {
    dispatch(getMatchList({ matchType: id }));
  };

  const dispatch: AppDispatch = useDispatch();
  useEffect(getMatchListService, [id]);

  useEffect(() => {
    expertSocketService.match.matchAdded(getMatchListService);
  }, []);

  return (
    <>
      {loading && <Loader />}
      {isMobile ? <SportsFilters /> : <DesktopMatchList type={id} />}
    </>
  );
};

export default GameList;
