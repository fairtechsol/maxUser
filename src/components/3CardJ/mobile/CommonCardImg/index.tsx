import { dragonTigerCards } from "../../../../utils/constants";
import { back } from "../../../../assets/images";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
const CommonCardImg = ({
  cardData,
  handleBet,
  data,
  cardInfo,
  setNat,
  nat,
}: any) => {
  const [cardImg, setCardImg] = useState(dragonTigerCards);
  const { selectedBet } = useSelector(
    (state: RootState) => state.match.matchList
  );
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
    if (data?.no?.gstatus === "0") {
      setClickedItems({});
      setClickedCards(0);
    }
  }, [data?.no?.gstatus]);

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

  useEffect(() => {
    if (selectedBet === null) {
      setClickedItems({});
      setClickedCards(0);
    }
  }, [selectedBet]);
  
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
          </div>
        );
      })}
    </div>
  );
};

export default CommonCardImg;
