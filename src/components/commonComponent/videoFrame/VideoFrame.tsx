import { memo, useEffect } from "react";
import FlipClock from "./FlipClock";
import isMobile from "../../../utils/screenDimension";

const VideoFrame = ({ result, time, id }: any) => {
  // const [showModal, setModalOpen] = useState(false);
  useEffect(() => {
    const element = document.getElementById("middleView-playerDiv");
    if (element) {
      element.style.display = "none !important";
    }
  }, []);
  

  return (
    <>
      <div
        key="odds"
        style={{
          position: "relative",
          display: "flex",
          backgroundColor: "white",
          // padding: ".1vh",
          flexDirection: "column",
          // marginY: ".5vh",
          marginTop: "0",
          // width:  "97%",
          // marginX: "0px",
          alignSelf: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              // height: isMobile ? "30vh" : "40vh",
              backgroundColor: "black",
              position: "relative",
              // width: "100vw"
            }}
          >
            {result && (
              <div style={{ position: "absolute", zIndex: "999" }}>{result}</div>
            )}
            <div style={isMobile ? {display: "flex", overflow: "hidden"} : {}}>
              <iframe
                width="100%"
                height={isMobile ? "250px" : "380px"}
                src={id}
                // transform={}
                style={isMobile ?
                  {transform :"scaleY(1.25)"} :{}
                }
                // title="YouTube video player"
                // frameborder="0"
                // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy={"strict-origin-when-cross-origin"}
                allowFullScreen
              ></iframe>
            </div>
            {time && (
              <div
                style={{
                  position: "absolute",
                  right: isMobile ? "-82px" : "10px",
                  bottom: isMobile ? "8px" : "10px",
                  fontSize: isMobile ? "1.5rem" : "2.5em",
                  height: isMobile ? "2rem" : "",
                  width: isMobile ? "150px" : "",
                }}
              >
                <FlipClock value={time?.length === 1 ? "0" + time : time} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(VideoFrame);
