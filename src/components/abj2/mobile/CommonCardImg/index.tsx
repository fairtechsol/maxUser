import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import { dragonTigerCards } from "../../../../utils/constants";

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
    if (cardData?.[0]?.gstatus === "0") {
      dispatch(selectedBetAction(""));
    } else {
    }
  }, [cardData?.[0]?.gstatus]);

  return (
    <div className="commonCardImgContainer">
      {cardImg?.map((item: any) => {
        return (
          <div key={item?.code}>
            <div
              className={item?.gstatus === "0" ? "suspended" : ""}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
              onClick={() => (item?.gstatus != "0" ? handleBet(item) : null)}
            >
              <img src={item?.imgSrc} width={"40px"} height={"50px"} alt="bet" />
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
              {data?.profitLoss ? (
                data?.profitLoss[
                  `${data?.videoInfo?.mid}_${item?.sid}_card`
                ] ? (
                  data?.profitLoss[`${data?.videoInfo?.mid}_${item?.sid}_card`]
                ) : (
                  <br></br>
                )
              ) : (
                0
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CommonCardImg;
