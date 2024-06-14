import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const CardResultBox = ({ name ,type}: any) => {
  const { liveGameResultTop10 } = useSelector((state: RootState) => state.card);
  return (
    <div className="cardResultBoxContainer">
      <div className="cardResultBoxHeader">
        <span style={{ fontSize: "14px" }}>Last Result</span>
        <a>
          <span style={{ fontSize: "14px" }}>View All</span>
        </a>
      </div>
      <div className="cardResultBoxRound">
        {liveGameResultTop10?.length > 0 &&
          liveGameResultTop10.map((item: any) => (
            <div
              className="cardResultCircle"
              key={item?.mid}
              style={{ backgroundColor: type==="card32"?  "" : item?.result === "3" ? "#ffc742" : "" }}
            >
              {type==="card32"? 
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#ffff33",
                }}
              >
                {item?.result === "1"
                  ? name?.[0]
                  : item?.result === "2"
                  ? name?.[1]
                  : item?.result === "3"
                  ? name?.[2]
                  : item?.result === "4"
                  ? name?.[3]
                  : null}
              </span> 
              : 
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: item?.result === "2" ? "#ffff33" : "#ff4500",
                }}
              >
                {item?.result === "1" ? name?.[0] : name?.[1]}
              </span>}
             
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardResultBox;
