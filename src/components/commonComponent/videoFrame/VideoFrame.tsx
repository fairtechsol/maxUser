import { memo, useEffect, useState } from "react";
import FlipClock from "./FlipClock";
import { isMobile } from "../../../utils/screenDimension";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { resultDragonTiger } from "../../../store/actions/cards/cardDetail";

const VideoFrame = ({ result, time, id, profitLoss }: any) => {
  const { dragonTigerDetail } = useSelector((state: RootState) => state.card);
  const [mid, setMid] = useState(null);
  const [curR,setCurR] = useState(null);
  const [isClick,setIsClick] = useState(false);
  // const [showModal, setModalOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const {  resultData } = useSelector(
    (state: RootState) => state.card
  );

  useEffect(() => {
    const element = document.getElementById("middleView-playerDiv");
    if (element) {
      element.style.display = "none !important";
    }
  }, []);

 useEffect(() => {
   if (resultData?.desc && isClick) {
     setCurR(resultData?.desc);
   }
 }, [resultData]);



 

  
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
              <div style={{ position: "absolute", zIndex: "999" }}>
                {result}
              </div>
            )}
            <div
              style={
                isMobile
                  ? { display: "flex", overflow: "hidden" }
                  : { position: "relative", width: "100%" }
              }
            >
              <iframe
                width="100%"
                height={isMobile ? "250px" : "380px"}
                // height="100%"
                src={id}
                referrerPolicy={"strict-origin-when-cross-origin"}
                allowFullScreen
              ></iframe>
              <ol
                style={{
                  background: "black",
                  opacity: "60%",
                  position: "absolute",
                  top: isMobile ? "10px" : "20px",
                  right: isMobile ? "30px" : "45px",
                  padding: profitLoss ? "10px" : "0px",
                }}
              >
                {profitLoss &&
                  Object.entries(profitLoss)?.map(([key, value]: any) => (
                    <li
                      key={key}
                      style={{
                        color: "#fff",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: isMobile ? "10px" : "16px",
                      }}
                    >
                      {key}
                      {"->"}{" "}
                      <span
                        style={{
                          color:
                            value.pl >= 0
                              ? "green"
                              : value.pl < 0
                              ? "red"
                              : "white",
                          textAlign: "end",
                          fontSize: isMobile ? "10px" : "16px",
                        }}
                      >
                        {value.pl}
                      </span>
                    </li>
                  ))}
              </ol>
            </div>

            {typeof time !== "undefined" && time !== null && (
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
                <FlipClock value={time < 10 ? "0" + time : time} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(VideoFrame);
