import React from 'react';
import '../style.scss';

const CasinoTable = ({cards,data}:any) => {

  const remarkText = "This is 21 cards game 2,3,4,5,6 x 4 =20 and 1 Queen. Minimum total 10 or queen is required to win.";

  return (
    <div className="casino-table-q">
      <div className="casino-table-box-q">
        {cards?.map((item:any, index:any) => (
          <div className="casino-odd-box-container-q" key={index}>
            <div className="casino-nation-name-q">{item?.nation}</div>
            <div className="casino-odds-box-q back suspended">
              <span className="casino-odds-q">{item?.b1}</span>
            </div>
            <div className="casino-odds-box-q lay suspended">
              <span className="casino-odds-q">{item.l1}</span>
            </div>
            <div className="casino-nation-book-q"></div>
          </div>
        ))}
      </div>
      <div className="casino-remark-q mt-1">
        <div className="marquee-q">
          <div className="marquee-content-q">
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasinoTable;
