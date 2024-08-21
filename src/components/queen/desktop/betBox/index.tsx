import React from 'react';
import '../style.scss'; // Assuming you're putting CSS in a separate file

const CasinoTable = () => {
  const casinoData = [
    { nationName: "Total 0", backOdds: "1.68", layOdds: "1.73" },
    { nationName: "Total 1", backOdds: "12.14", layOdds: "13.76" },
    { nationName: "Total 2", backOdds: "2.95", layOdds: "3.11" },
    { nationName: "Total 3", backOdds: "0", layOdds: "0" },
  ];

  const remarkText = "This is 21 cards game 2,3,4,5,6 x 4 =20 and 1 Queen. Minimum total 10 or queen is required to win.";

  return (
    <div className="casino-table-q">
      <div className="casino-table-box-q">
        {casinoData.map((item, index) => (
          <div className="casino-odd-box-container-q" key={index}>
            <div className="casino-nation-name-q">{item.nationName}</div>
            <div className="casino-odds-box-q back">
              <span className="casino-odds-q">{item.backOdds}</span>
            </div>
            <div className="casino-odds-box-q lay">
              <span className="casino-odds-q">{item.layOdds}</span>
            </div>
            <div className="casino-nation-book-q"></div>
          </div>
        ))}
      </div>
      <div className="casino-remark-q mt-1">
        <div className="marquee-q">
          <div className="marquee-content-q">
            {remarkText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasinoTable;
