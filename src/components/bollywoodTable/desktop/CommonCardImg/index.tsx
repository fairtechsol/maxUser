import { useEffect, useState } from "react";
import { bollywoodTableCards } from "../../../../utils/constants";
import "../../../commonStyle.scss";

const CommonCardImg = ({ cardData, handleBet, data }: any) => {
  const [cardImg, setCardImg] = useState(bollywoodTableCards);
  useEffect(() => {
    const mergedArray = cardData?.map((item: any, index: any) => {
      return {
        ...item,
        ...bollywoodTableCards[index],
      };
    });
    setCardImg(mergedArray);
  }, [cardData]);

  return (
    <div className="commonCardImgContainerAb">
      {cardImg?.map((item: any) => {
        return (
          <div>
            <div
              className={
                item?.gstatus === "SUSPENDED" ||
                  item?.gstatus === "CLOSED" ||
                  item?.b1 === "0.00"
                  ? "suspended"
                  : ""
              }
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
              onClick={() =>
                item?.gstatus === "SUSPENDED" || item?.gstatus === "CLOSED"
                  ? null
                  : handleBet(item)
              }
              key={item?.code}
            >
              {" "}
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
                  : <br></br>
                : 0}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CommonCardImg;
