import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { back } from "../../../../assets/images";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import { dragonTigerCards } from "../../../../utils/constants";

const CommonCardImg = ({ cardData, handleBet, data, cardInfo }: any) => {
  const [cardImg, setCardImg] = useState(dragonTigerCards);
  const dispatch: AppDispatch = useDispatch();
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
    if (item?.gstatus === "0" && cardInfo?.[0] === "" ) {
      return 'suspended';
    }else if(item?.gstatus === "0" && cardInfo?.[0] != "" ){
      return "stop"
    }else{
      return ""
    }
  };



  useEffect(() => {
    if (cardData?.[0]?.gstatus === "0") {
      dispatch(selectedBetAction(""));
    } else {
    }
  }, [cardData?.[0]?.gstatus]);

  return (
    <div className="commonCardImgContainer" >
      {cardImg?.map((item: any,index:number) => {
        return (
          <div key={index} style={{margin:"2px"}}>
            <div
              key={item?.code}
              className={handlock(item)}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
              onClick={() => (handlock(item) !="" ? null : handleBet(item))}
            >
              {
              item?.show ? <img src={item?.imgSrc} height={"45px"} width={"31px"} /> : <img src={back} height={"45px"} width={"31px"} />
            } 
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
