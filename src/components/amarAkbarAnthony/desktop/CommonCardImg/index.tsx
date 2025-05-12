import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import { dragonTigerCards } from "../../../../utils/constants";
import "../../../commonStyle.scss";

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
    <div className="commonCardImgContainerAbj">
      {cardImg?.map((item: any) => {
        return (
          <div key={item?.code}>
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
            >
              {" "}
              <img src={item?.imgSrc} width={"40px"} alt="bet" />
            </div>
            <span
              style={{
                fontSize: "16px",
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
