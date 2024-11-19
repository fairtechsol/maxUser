import React, { useEffect, useState } from "react";
import { dt2020 } from "../../assets/images";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import data from "./data.json";

const LiveCasino = () => {
    const { liveCasinoData } = useSelector((state: RootState) => state.card);
    const initialType = liveCasinoData && Object.keys(liveCasinoData).length > 0 
    ? Object.keys(liveCasinoData)[0] 
    : null;

  const [type, setType] = useState(initialType);
  const [game, setGame] = useState(initialType ? liveCasinoData?.[initialType]?.[0] : null);

//   useEffect(() => {
//     if (initialType && !type) {
//       setType(initialType);
//       setGame(liveCasinoData?.[initialType]?.[0]);
//     }
//   }, [initialType, liveCasinoData, type]);

//   if (!liveCasinoData || Object.keys(liveCasinoData).length === 0) {
//     return <div>Loading...</div>; // Show loading indicator or placeholder
//   }
  
    console.log(initialType, "LiveCasino Data");
  
    const LiveCasinoTab = ({ data2 }: { data2: any }) => {

      return (
        <div className="w-100 d-flex flex-row bg-gray">
          {Object.keys(data2)?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                onClick={() => setGame(item)}
                className="d-flex justify-content-center align-items-center py-1 px-4"
                style={{
                  cursor: "pointer",
                  backgroundColor: game?.game_id === item?.game_id ? "#007bff" : "",
                  color: game?.game_id === item?.game_id ? "#fff" : "#000",
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      );
    };
  
    const LiveCasinoGames = ({ data3 }: { data3: any }) => {
        console.log(data3, "img")
      return (
        <div
          className="w-100 d-flex flex-row flex-wrap mt-1"
          style={{ gap: "10px" }}
        >
          {data3?.map((item: any, index: number) => {
            return (
              <img
                key={index}
                src={item?.url_thumb}
                className="img-fluid"
                alt={item?.game_name}
                loading="lazy"
                style={{ width: "19%", height: "10vh" }}
              />
            );
          })}
        </div>
      );
    };
  
    return (
      <div className="w-100 d-flex flex-row mt-1 gap-2">
        {/* Sidebar with dynamic categories */}
        <div className="w-25 h-100 d-flex flex-column bg-secondary">
          {Object.keys(liveCasinoData)?.map((key, index) => {
            const isActive = type === key;
            console.log(key, "key")
            return (
              <div
                key={index}
                onClick={() => {
                  setType(key);
                  setGame(liveCasinoData[key]?.[0]);
                }}
                className={`w-100 d-flex justify-content-center align-items-center py-2 ${isActive ? "bg-tab text-white" : ""}`}
                style={{
                  cursor: "pointer",
                  backgroundColor: isActive ? "#007bff" : "",
                  color: isActive ? "#fff" : "#000",
                }}
              >
                {key}
              </div>
            );
          })}
        </div>
  
        {/* Main content area */}
        <div className="w-75 d-flex flex-column">
          <LiveCasinoTab data2={liveCasinoData[type]} />
          <LiveCasinoGames data3={liveCasinoData[type]} />
        </div>
      </div>
    );
  };
  
  export default LiveCasino;
