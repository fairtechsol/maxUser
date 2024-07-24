import { dragonTigerCards } from "../../../../utils/constants";
import { back } from "../../../../assets/images";
import { useEffect, useState } from "react";

const CommonCardImg = ({
  cardData,
  handleBet,
  data,
  cardInfo,
  setNat,
  nat,
}: any) => {
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
    if (item?.gstatus === "0") {
      return "suspended";
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (data.no.gstatus === "0") {
      setClickedItems({});
      setClickedCards(0);
    }
  }, [data.no.gstatus]);

  console.log("lock", data);
  useEffect(() => {
    handleBet();
  }, [nat]);

  const [clickedItems, setClickedItems] = useState<Record<string, boolean>>({});
  const [clickedCards, setClickedCards] = useState<number>(0);

  const handleItemClick = (item: any) => {
    setClickedCards((p) => p + 1);
    const itemCode = item.code;
    setClickedItems((prev) => ({
      ...prev,
      [itemCode]: !prev[itemCode],
    }));
  };

  return (
    <div className="commonCardImgContainer">
      {cardImg?.map((item: any, index: number) => {
        return (
          <div key={index} style={{ marginLeft: "5px" }}>
            <div
              key={item?.code}
              className={handlock(item)}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                border: clickedItems[item.code] ? "solid #086f3f 2px" : "none",
              }}
              onClick={() =>
                handlock(item) !== ""
                  ? null
                  : (() => {
                      clickedCards < 3 ? handleItemClick(item) : "";
                      setNat((p: any) => {
                        return p.length < 3 ? p + item[0] : p;
                      });
                    })()
              }
            >
              {item?.show ? (
                <img src={item?.imgSrc} width={"30px"} />
              ) : (
                <img src={back} width={"30px"} />
              )}
            </div>
            <span
              style={{
                fontSize: "12px",
                display: "flex",
                justifyContent: "center",
              }}
              className={`${
                data?.profitLoss
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
              {" "}
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
