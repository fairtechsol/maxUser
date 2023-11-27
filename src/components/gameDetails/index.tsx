import isMobile from "../../utils/screenDimension";
import DesktopGameDetail from "./desktop";
import MobileGameDetail from "./mobile";

interface GameDetailProps {
  data: any;
}

const GameDetails = ({ data }: GameDetailProps) => {
  return (isMobile?<MobileGameDetail data={data} />:<DesktopGameDetail data={data}/>);
};

export default GameDetails;
