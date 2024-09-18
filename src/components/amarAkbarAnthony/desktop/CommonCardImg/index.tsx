import { useEffect, useState } from "react";
import { dragonTigerCards } from "../../../../utils/constants";
import "../../desktop/style.scss";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";

const CommonCardImg = ({ cardData, handleBet, data }: any) => {
  const [cardImg, setCardImg] = useState(dragonTigerCards);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const mergedArray = cardData?.map((item: any, index: any) => {
      return {
        ...item,
        ...dragonTigerCards[index],
      };
    });
    setCardImg(mergedArray);
  }, [cardData]);

  useEffect(() => {
    if (
      cardData?.[0]?.gstatus === "SUSPENDED" ||
      cardData?.[0]?.b1 === "0.00"
    ) {
      dispatch(selectedBetAction(""));
    } else {
    }
  }, [cardData?.[0]?.gstatus, cardData?.[0]?.b1]);
  
  return (
    <div className="commonCardImgContainer">
      {cardImg?.map((item: any) => {
        return (
          <div>
            <div
              className={item?.gstatus === "SUSPENDED" ? "suspended" : ""}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
              onClick={() =>
                item?.gstatus != "SUSPENDED" ? handleBet(item) : null
              }
              key={item?.code}
            >
              {" "}
              <img src={item?.imgSrc} width={"40px"} />
            </div>
            <span
              style={{
                fontSize: "16px",
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
