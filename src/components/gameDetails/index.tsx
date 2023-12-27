import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import isMobile from "../../utils/screenDimension";
import DesktopGameDetail from "./desktop";
import MobileGameDetail from "./mobile";
import { useEffect } from "react";
import { getButtonValue } from "../../store/actions/user/userAction";

interface GameDetailProps {
  data: any;
}

const GameDetails = ({ data }: GameDetailProps) => {

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getButtonValue());
  }, []);

  return (isMobile?<MobileGameDetail data={data} />:<DesktopGameDetail data={data}/>);
};

export default GameDetails;
