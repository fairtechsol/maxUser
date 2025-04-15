import { useEffect, useState } from "react";
import { dragonTigerCards } from "../../../../utils/constants";
import "../../../commonStyle.scss";
const CommonCardImg = ({ cardData, handleBet, data }: any) => {
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
    <div className="commonCardImgContainerAbj">
      {cardImg?.map((item: any) => {
        return (
          <div>
            <div
              className={item?.gstatus === "0" ? "suspended" : ""}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
              onClick={() => (item?.gstatus != "0" ? handleBet(item) : null)}
              key={item?.code}
            >
              <img src={item?.imgSrc} width={"40px"} />
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
                  : ""
                : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CommonCardImg;
