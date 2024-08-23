import { useParams } from "react-router-dom";
import { cardUrl } from "../../../utils/constants";

const VideoPage = () => {
  const { vidId } = useParams();
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#000",
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src={`${cardUrl}${vidId}`}
          // transform={}
          // style={isMobile ?
          //   {transform :"scaleX(1.20)"} :{}
          // }
          // title="YouTube video player"
          // frameborder="0"
          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy={"strict-origin-when-cross-origin"}
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default VideoPage;
