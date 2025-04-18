import { useEffect, useState } from "react";
import { back } from "../../../../assets/images";
import { dragonTigerCards } from "../../../../utils/constants";

const CommonCardImg = ({ cardData, handleBet, data, cardInfo }: any) => {
  const [cardImg, setCardImg] = useState(dragonTigerCards);
  useEffect(() => {
    const mergedArray = cardData?.map((item: any, index: any) => {
      return {
        ...item,
        ...dragonTigerCards[index],
        show: cardInfo?.[index] !== "0",
      };
    });
    setCardImg(mergedArray);
  }, [cardData]);

  const handlock = (item: any) => {
    if (item?.gstatus === "0" && cardInfo?.[0] === "") {
      return "suspended";
    } else if (item?.gstatus === "0" && cardInfo?.[0] != "") {
      return "stop";
    } else {
      return "";
    }
  };
  return (
    <div className="commonCardImgContainerAbj">
      {cardImg?.map((item: any) => {
        return (
          <div>
            <div
              key={item?.code}
              className={handlock(item)}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
              onClick={() => (handlock(item) != "" ? null : handleBet(item))}
            >
              {item?.show ? (
                <img src={item?.imgSrc} width={"30px"} alt="lock" />
              ) : (
                <img src={back} width={"30px"} alt="lock" />
              )}
            </div>
            <span
              style={{
                fontSize: "12px",
                display: "flex",
                justifyContent: "center",
              }}
              className={`${data?.profitLoss
                ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${item?.sid}_card`
                ]
                  ? data?.profitLoss[
                    `${data?.videoInfo?.mid}_${item?.sid}_card`
                  ] > 0
                    ? "color-green"
                    : data?.profitLoss[
                      `${data?.videoInfo?.mid}_${item?.sid}_card`
                    ] < 0
                      ? "color-red"
                      : ""
                  : ""
                : ""
                }`}
            >
              {data?.profitLoss
                ? data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
                  ? data?.profitLoss[
                  `${data?.videoInfo?.mid}_${item?.sid}_card`
                  ]
                  : 0
                : 0}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CommonCardImg;
