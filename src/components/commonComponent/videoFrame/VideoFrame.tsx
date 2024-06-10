
import React, { memo, useState } from "react";
import FlipClock from "./flipClock";

const VideoFrame = ({   time }:any) => {
  const [showModal, setModalOpen] = useState(false);

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
              height: "37vh",
              backgroundColor: "black",
              position: "relative",
            }}
          >
            {/* {result && ( */}
              <div style={{ position: "absolute", left: "10px", top: "10x" }}>
                {111}
              </div>
            {/* )} */}
            {time && (
              <div
                style={{
                  position: "absolute",
                  right: "10px",
                  bottom: "10px",
                  fontSize: "2.5em",
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
