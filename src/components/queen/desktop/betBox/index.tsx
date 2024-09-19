import React from "react";
import "../style.scss";
import { AppDispatch } from "../../../../store/store";
import { useDispatch } from "react-redux";
import { selectedBetAction } from "../../../../store/actions/match/matchListAction";

const CasinoTable = ({ cards, data, playerNum }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const handleBet = (item: any, type: any) => {
    let team = {
      bettingType: type,
      matchId: data?.id,
      odd: type === "BACK" ? item?.b1 : item?.l1,
      stake: 0,
      matchBetType: "matchOdd",
      betOnTeam: item?.nation,
      name: item?.nation,
      bettingName: "Match odds",
      selectionId: item?.sid,
    };
    dispatch(
      selectedBetAction({
        team,
        data,
      })
    );
  };
  return (
    <div className="casino-table-q">
      <div className="casino-table-box-q-desktop">
        {cards?.map((item: any, index: any) => (
          <div className="casino-odd-box-container-q" key={index}>
            <div className="casino-nation-name-q">{item?.nation}</div>
            <div
              onClick={() => handleBet(item, "BACK")}
              className={
                item?.gstatus === "SUSPENDED" 
                  ? "casino-odds-box-q back suspended-box"
                  : "casino-odds-box-q back "
              }
            >
              <span className="casino-odds-q">{item?.b1}</span>
            </div>
            <div
              onClick={() => handleBet(item, "LAY")}
              className={
                item?.gstatus === "SUSPENDED" 
                  ? "casino-odds-box-q lay suspended-box"
                  : "casino-odds-box-q lay "
              }
            >
              <span className="casino-odds-q">{item.l1}</span>
            </div>
            <span
              className={` ps-4 ms-5 ${
                data?.profitLoss
                  ? data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                    ? JSON.parse(
                        data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                      )[`total${index}`] > 0
                      ? "color-green"
                      : JSON.parse(
                          data?.profitLoss[`${data?.videoInfo?.mid}_1_card`]
                        )[`total${index}`] < 0
                      ? "color-red"
                      : ""
                    : ""
                  : ""
              }`}
              style={{ zIndex: "100" }}
            >
              {data?.profitLoss?.[`${data?.videoInfo?.mid}_1_card`]
                ? JSON.parse(
                    data?.profitLoss?.[`${data?.videoInfo?.mid}_1_card`]
                  )[`total${index}`]
                : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CasinoTable;
