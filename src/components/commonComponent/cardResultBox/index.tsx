import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";

const CardResultBox = ({ data }: any) => {
  const navigate = useNavigate();
  const { liveGameResultTop10 } = useSelector((state: RootState) => state.card);
  return (
    <div className="cardResultBoxContainer">
      <div className="cardResultBoxHeader">
        <span style={{ fontSize: "14px" }}>Last Result</span>
        <a>
          <span
            style={{ fontSize: "14px", cursor: "pointer" }}
            onClick={() =>
              navigate("/casino-report", {
                state: { cardType: data?.type },
              })
            }
          >
            View All
          </span>
        </a>
      </div>
      <div className="cardResultBoxRound">
        {liveGameResultTop10?.length > 0 &&
          liveGameResultTop10.map((item: any) => (
            <div
              className="cardResultCircle"
              key={item?.mid}
              style={{ backgroundColor: item?.result === "3" ? "#ffc742" : "" }}
            >
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: item?.result === "2" ? "#ffff33" : "#ff4500",
                }}
              >
                {item?.result === "1" ? "D" : "T"}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardResultBox;
