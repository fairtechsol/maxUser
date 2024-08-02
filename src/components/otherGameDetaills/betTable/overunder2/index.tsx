import React from "react";
import "../style.scss";
import isMobile from "../../../../utils/screenDimension";

const MarketRow = ({ title, odds }: any) => {
  // console.log(odds, "dfsgdf")
  return (
    <div className="market-row-o" data-title="ACTIVE">
      <div className="market-nation-detail-o">
        <span className="market-nation-name-o ">{title}</span>
        <div className="market-nation-book-o"></div>
      </div>
      {odds?.map((odd: any, index: any) => (
        <div key={index} className={`market-odd-box-o ${odd.className}`}>
          <span className="market-odd-o">{odd.value}</span>
          <span className="market-volume-o">{odd.volume}</span>
        </div>
      ))}
    </div>
  );
};

const OverUnderMarket2 = ({
  minMax,
  data,
  backLayCount,
  matchDetails,
  title,
}: any) => {
  console.log(data, "hbdj");
  return (
    <div className={`game-market-o market-4-o`}>
      <div className="market-header-o d-flex">
        <div className="market-nation-detail-o">
          <span className="market-nation-name-o">
            Max: {minMax.max} / Min: {minMax.min}
          </span>
        </div>
         {!isMobile && (
          <>
            <div className={`market-odd-box-o`}></div>
            <div className={`market-odd-box-o`}></div>
          </>)
        }
        <div className={`market-odd-box-o back`}>{<b>{"BACK"}</b>}</div>
        <div className={`market-odd-box-o lay`}>{<b>{"LAY"}</b>}</div>
        <div className={`market-odd-box-o`}></div>
        <div className={`market-odd-box-o`}></div>
      </div>
      <div className="market-body-o" data-title="OPEN">
        {/* {data?.map((market:any, index:any) => ( */}
        <MarketRow
          //   key={index}
          title={data?.name}
          odds={[
            { className: "back2", value: data.backTeamA, volume: "N/A" },
            { className: "back1", value: data.backTeamB, volume: "N/A" },
            { className: "back", value: data.backTeamC, volume: "N/A" },
            { className: "lay", value: data.layTeamA, volume: "N/A" },
            { className: "lay1", value: data.layTeamB, volume: "N/A" },
            { className: "lay2", value: data.layTeamC, volume: "N/A" },
          ]}
        />
        <MarketRow
          //   key={index}
          title={data?.name}
          odds={[
            { className: "back2", value: data.backTeamA, volume: "N/A" },
            { className: "back1", value: data.backTeamB, volume: "N/A" },
            { className: "back", value: data.backTeamC, volume: "N/A" },
            { className: "lay", value: data.layTeamA, volume: "N/A" },
            { className: "lay1", value: data.layTeamB, volume: "N/A" },
            { className: "lay2", value: data.layTeamC, volume: "N/A" },
          ]}
        />
        <MarketRow
          //   key={index}
          title={data?.name}
          odds={[
            { className: "back2", value: data.backTeamA, volume: "N/A" },
            { className: "back1", value: data.backTeamB, volume: "N/A" },
            { className: "back", value: data.backTeamC, volume: "N/A" },
            { className: "lay", value: data.layTeamA, volume: "N/A" },
            { className: "lay1", value: data.layTeamB, volume: "N/A" },
            { className: "lay2", value: data.layTeamC, volume: "N/A" },
          ]}
        />
        {/* ))} */}
      </div>
    </div>
  );
};

export default OverUnderMarket2;
