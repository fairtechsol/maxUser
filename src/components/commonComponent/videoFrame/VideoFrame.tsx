import { memo } from "react";
import FlipClock from "./FlipClock";
import isMobile from "../../../utils/screenDimension";
import { cardUrl } from "../../../utils/constants";

const VideoFrame = ({ result, time,id }: any) => {
  // const [showModal, setModalOpen] = useState(false);

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
              height: isMobile ? "30vh" : "40vh",
              backgroundColor: "black",
              position: "relative",
            }}
          >
            {result && (
              <div style={{ position: "absolute", top: "10x" }}>{result}</div>
            )}
            <div>
              <iframe
                width="100%"
                height={isMobile?"250":"380"}
                src={`${cardUrl}${id}`}
                // title="YouTube video player"
                // frameborder="0"
                // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy={"strict-origin-when-cross-origin"}
                // allowfullscreen
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
