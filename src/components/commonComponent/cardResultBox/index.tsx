const CardResultBox = () => {
  const arr = ["T", "D", "T", "T", "D", "T", "D", "T", "T", "D"];
  return (
    <div className="cardResultBoxContainer">
      <div className="cardResultBoxHeader">
        <span style={{ fontSize: "14px" }}>Last Result</span>
        <a>
          <span style={{ fontSize: "14px" }}>View All</span>
        </a>
      </div>
      <div className="cardResultBoxRound">
        {arr.map((item) => {
          return (
            <>
              <div className="cardResultCircle">
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: item === "T" ? "#ffff33" : "#ff4500",
                  }}
                >
                  {item}
                </span>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default CardResultBox;
