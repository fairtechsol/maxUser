import { dragonTigerCards } from "../../../../utils/constants";
import { useEffect, useState } from "react";

const CommonCardImg = ({ cardData, handleBet }: any) => {
  const [cardImg, setCardImg] = useState(dragonTigerCards);
  useEffect(() => {
    const mergedArray = cardData?.map((item: any, index: any) => {
      return {
        ...item,
        ...dragonTigerCards[index],
      };
    });
    setCardImg(mergedArray);
  }, [cardData]);

  return (
    <div className="commonCardImgContainer">
      {cardImg?.map((item: any) => {
        return (
          <div
            key={item?.code}
            className={item?.gstatus === "0" ? "suspended" : ""}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
            onClick={() =>(item?.gstatus != "0" ? handleBet(item) : null)}
          >
            {" "}
            <img src={item?.imgSrc} width={"30px"} />
            <span style={{ fontSize: "12px" }}>{item?.value}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CommonCardImg;
