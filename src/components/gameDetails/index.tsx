import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { matchDetailAction } from "../../store/actions/match/matchListAction";
import { getButtonValue } from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";
import isMobile from "../../utils/screenDimension";
import DesktopGameDetail from "./desktop";
import MobileGameDetail from "./mobile";

const GameDetails = () => {
  const dispatch: AppDispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getButtonValue());
  }, [dispatch]);

  useEffect(() => {
    dispatch(matchDetailAction(id));
  }, [id]);

  return isMobile ? <MobileGameDetail /> : <DesktopGameDetail />;
};

export default GameDetails;
