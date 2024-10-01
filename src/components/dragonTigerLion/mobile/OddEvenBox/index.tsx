import { useEffect, useState } from "react";
import { BiSolidHeart } from "react-icons/bi";
import { GiSpades } from "react-icons/gi";
import { ImClubs, ImDiamonds } from "react-icons/im";
import { useDispatch } from "react-redux";
import {
  A,
  eight,
  eleven,
  five,
  four,
  nine,
  seven,
  six,
  ten,
  thirteen,
  three,
  twelve,
  two,
} from "../../../../assets/images";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
const cardImg = (type: any) => {
  return <img src={type} width={25} />;
};
const cardBlock = (type: any) => {
  return (
    <div>
      <span>{type}</span>{" "}
      {type != "Black" ? (
        <>
          <ImDiamonds color="#ff0000" /> <BiSolidHeart color="#ff0000" />
        </>
      ) : (
        <>
          <ImClubs color="#000000" /> <GiSpades color="#000000" />
        </>
      )}
    </div>
  );
};
const data1 = [
  {
    title: "Winner",
    type: "Winner",
    profitLoss: "0",
  },
  {
    title: cardBlock("Black"),
    type: "Black",
    profitLoss: "0",
  },
  {
    title: cardBlock("Red"),
    type: "Red",
    profitLoss: "0",
  },
  {
    title: "Odd",
    type: "Odd",
    profitLoss: "0",
  },
  {
    title: "Even",
    type: "Even",
    profitLoss: "0",
  },
  {
    title: cardImg(A),
    type: "A",
    profitLoss: "0",
  },
  {
    title: cardImg(two),
    type: "2",
    profitLoss: "0",
  },
  {
    title: cardImg(three),
    type: "3",
    profitLoss: "0",
  },
  {
    title: cardImg(four),
    type: "4",
    profitLoss: "0",
  },
];
const data2 = [
  {
    title: cardImg(five),
    type: "5",
    profitLoss: "0",
  },
  {
    title: cardImg(six),
    type: "6",
    profitLoss: "0",
  },
  {
    title: cardImg(seven),
    type: "7",
    profitLoss: "0",
  },
  {
    title: cardImg(eight),
    type: "8",
    profitLoss: "0",
  },
  {
    title: cardImg(nine),
    type: "9",
    profitLoss: "0",
  },
  {
    title: cardImg(ten),
    type: "10",
    profitLoss: "0",
  },
  {
    title: cardImg(eleven),
    type: "J",
    profitLoss: "0",
  },
  {
    title: cardImg(twelve),
    type: "Q",
    profitLoss: "0",
  },
  {
    title: cardImg(thirteen),
    type: "K",
    profitLoss: "0",
  },
];
const OddEven = ({ data, odds }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [firstArr, setFirstArr] = useState(data1);
  const [secondArr, setSecondArr] = useState(data2);
  const handleBet = (item: any) => {
    let team = {
      bettingType: "BACK",
      matchId: data?.id,
      odd: item?.b1,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nat,
      name: item?.nat,
      bettingName: "Match odds",
      selectionId: item?.sid,
      min:item?.min,
      max:item?.max
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };

  useEffect(() => {
    const mergedArray = data1?.map((item1: any) => {
      const matchData = odds?.find((item2: any) =>
        item2?.nat?.includes(item1.type)
      );
      if (matchData) {
        return {
          ...item1,
          data: matchData,
        };
      } else {
        return item1;
      }
    });
    const mergedArray2 = data2?.map((item1: any) => {
      const matchData = odds?.find((item2: any) =>
        item2?.nat?.includes(item1.type)
      );
      if (matchData) {
        return {
          ...item1,
          data: matchData,
        };
      } else {
        return item1;
      }
    });
    setFirstArr(mergedArray);
    setSecondArr(mergedArray2);
  }, [data]);

  useEffect(() => {
    if (
      data?.dragonData?.[0].gstatus === "0" ||
      data?.dragonData?.[0]?.b1 === "0.00"
    ) {
      dispatch(selectedBetAction(""));
    }
  }, [
    data?.dragonData?.[0].gstatus,
    data?.dragonData?.[0]?.b1,
  ]);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "50%",
            marginTop: "2%",
            display: "flex",
            flexDirection: "column",
            border: "0.3px solid #c7c8ca",
            marginLeft: "5px",
          }}
        >
          {firstArr?.map((item: any) => {
            return (
              <>
                <div className="dlt-m-conatainer">
                  <div className="dtlTitle-m">
                    {item?.title}
                  </div>
                  <div
                    className={`dtlsubTitle-m ${
                      item?.data?.gstatus === "0" ? "lock" : ""
                    }`}
                    onClick={() =>
                      item?.data?.gstatus === "1" ? handleBet(item?.data) : null
                    }
                  >
                    {item?.data?.b1 || 0}
                    <span
                      style={{ fontSize: "12px",zIndex:"100" }}
                      className={
                        data?.profitLoss
                          ? data?.profitLoss[
                              `${data?.videoInfo?.mid}_${item?.data?.sid}_card`
                            ]
                            ? data?.profitLoss[
                                `${data?.videoInfo?.mid}_${item?.data?.sid}_card`
                              ] > 0
                              ? "color-green"
                              : data?.profitLoss[
                                  `${data?.videoInfo?.mid}_${item?.data?.sid}_card`
                                ] < 0
                              ? "color-red"
                              : ""
                            : ""
                          : ""
                      }
                    >
                      {data?.profitLoss
                        ? data?.profitLoss[
                            `${data?.videoInfo?.mid}_${item?.data?.sid}_card`
                          ]
                          ? data?.profitLoss[
                              `${data?.videoInfo?.mid}_${item?.data?.sid}_card`
                            ]
                          : ""
                        : ""}
                    </span>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div
          style={{
            width: "50%",
            marginTop: "2%",
            display: "flex",
            flexDirection: "column",
            border: "0.3px solid #c7c8ca",
          }}
        >
          {secondArr?.map((item: any) => {
            return (
              <>
                <div className="dlt-m-conatainer">
                  <div className="dtlTitle-m">
                    {item?.title}
                  </div>
                  <div
                    className={`dtlsubTitle-m ${
                      item?.data?.gstatus === "0" ? "lock" : ""
                    }`}
                    onClick={() =>
                      item?.data?.gstatus === "1" ? handleBet(item?.data) : null
                    }
                  >
                    {item?.data?.b1 || 0}
                    <span
                      style={{ fontSize: "12px",zIndex:"100" }}
                      className={
                        data?.profitLoss
                          ? data?.profitLoss[
                              `${data?.videoInfo?.mid}_${item?.data?.sid}_card`
                            ]
                            ? data?.profitLoss[
                                `${data?.videoInfo?.mid}_${item?.data?.sid}_card`
                              ] > 0
                              ? "color-green"
                              : data?.profitLoss[
                                  `${data?.videoInfo?.mid}_${item?.data?.sid}_card`
                                ] < 0
                              ? "color-red"
                              : ""
                            : ""
                          : ""
                      }
                    >
                      {data?.profitLoss
                        ? data?.profitLoss[
                            `${data?.videoInfo?.mid}_${item?.data?.sid}_card`
                          ]
                          ? data?.profitLoss[
                              `${data?.videoInfo?.mid}_${item?.data?.sid}_card`
                            ]
                          : ""
                        : ""}
                    </span>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OddEven;
