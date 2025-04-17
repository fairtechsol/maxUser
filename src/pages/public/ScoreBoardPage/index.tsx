import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { scoreBoardUrlMain } from "../../../utils/constants";
import { getTvData } from "../../../utils/tvUrlGet";

const ScoreBoardPage = () => {
  const { vidId, sportsId } = useParams();
  const [tvData, setTvData] = useState<any>(null);

  const iframeStyles: any = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "none",
    zIndex: -1,
  };

  const containerStyles: any = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    zIndex: -1,
  };

  useEffect(() => {
    if (vidId && import.meta.env.VITE_NODE_ENV == "production") {
      getTvData(vidId, setTvData, sportsId, false, true);
    }
  }, [vidId]);
  return (
    <div style={containerStyles}>
      <iframe
        style={iframeStyles}
        src={
          import.meta.env.VITE_NODE_ENV == "production"
            ? tvData?.scoreData?.iframeUrl
            : `${scoreBoardUrlMain}${vidId}/${sportsId}`
        }
        frameBorder="0"
        // allow="autoplay; fullscreen"
        // allowFullScreen
      />
    </div>
  );
};

export default ScoreBoardPage;
