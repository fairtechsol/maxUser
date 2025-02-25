import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { liveStreamPageUrl } from "../../../utils/constants";
import { getTvData } from "../../../utils/tvUrlGet";

const LiveStreamPage = () => {
  const { vidId, sportId } = useParams();
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
      getTvData(vidId, setTvData, sportId);
    }
  }, [vidId]);
  return (
    <div style={containerStyles}>
      <iframe
        style={iframeStyles}
        src={
          import.meta.env.VITE_NODE_ENV == "production"
            ? tvData?.tvData?.iframeUrl
            : `${liveStreamPageUrl}${vidId}/${sportId}`
        }
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    </div>
  );
};

export default LiveStreamPage;
