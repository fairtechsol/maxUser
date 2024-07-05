import "./style.scss"
// const bookmakerData = [
//   { nation: 'AUS', backOdd: '1.3', backVolume: '300000.00', layOdd: '1.34', layVolume: '300000.00', suspended: true },
//   { nation: 'IND', backOdd: '-', backVolume: '0.00', layOdd: '-', layVolume: '0.00', suspended: true },
// ];

const fancyData = [
  { nation: 'Ind Over 3', backOdd: '-', layOdd: '-', suspended: true },
];


const MarketComponent = ({showFancy, odds }:any) => {
  return (
    <div className="casino-detail detail-page-container-c position-relative">
      <div className="game-market-c market-2">
        <div className="market-title"><span>Bookmaker</span></div>
        <div className="market-header-c">
          <div className="market-nation-detail-b">
            <span className="market-nation-name-c">Min: 100.00 Max: 3L</span>
          </div>
          <div className="market-odd-box-c back"><b>Back</b></div>
          <div className="market-odd-box-c lay"><b>Lay</b></div>
        </div>
        <div className="market-body-c" data-title="OPEN">
          {/* {odds?.map((row:any, index:any) => ( */}
            <div className={`market-row-c`} >
              <div className="market-nation-detail-b">
                <span className="market-nation-name-c">{odds?.[0]?.nat}</span>
                <div className="market-nation-book-c"></div>
              </div>
              <div    className={`market-row-c ${odds?.[0]?.status === 'SUSPENDED' ? 'suspended-row' : ''}`}
                      data-title={odds?.[0]?.status === 'SUSPENDED' ? 'SUSPENDED' : 'ACTIVE'}>
              <div className="market-odd-box-c back">
                <span className="market-odd-c">{odds?.[0]?.b1}</span>
                <span className="market-volume-c">{odds?.[0]?.bs1}</span>
              </div>
              <div className="market-odd-box-c lay">
                <span className="market-odd-c">{odds?.[0]?.l1}</span>
                <span className="market-volume">{odds?.[0]?.ls1}</span>
              </div>
              </div>
            </div>
            <div className={`market-row-c`} >
              <div className="market-nation-detail-b">
                <span className="market-nation-name-c">{odds?.[1]?.nat}</span>
                <div className="market-nation-book-c"></div>
              </div>
              <div   className={`market-row-c ${odds?.[1]?.status === 'SUSPENDED' ? 'suspended-row' : ''}`}
                     data-title={odds?.[1]?.status === 'SUSPENDED' ? 'SUSPENDED' : 'ACTIVE'} >
              <div className="market-odd-box-c back">
                <span className="market-odd-c">{odds?.[1]?.b1}</span>
                <span className="market-volume-c">{odds?.[1]?.bs1}</span>
              </div>
              <div className="market-odd-box-c lay">
                <span className="market-odd-c">{odds?.[1]?.l1}</span>
                <span className="market-volume">{odds?.[1]?.ls1}</span>
              </div>
              </div>
            </div>
          {/* ))} */}
        </div>
      </div>

      {showFancy && (
        <div className="game-market market-6 mt-2">
          <div className="market-title"><span>Fancy</span></div>
          <div className="market-header-c">
            <div className="market-nation-detail-c"></div>
            <div className="market-odd-box-c lay"><b>No</b></div>
            <div className="market-odd-box-c back"><b>Yes</b></div>
            <div className="fancy-min-max-box"></div>
          </div>
          <div className="market-body-c" data-title="OPEN">
            {fancyData?.map((row:any, index:any) => (
              <div className={`fancy-market`} >
                <div className="market-row-c">
                  <div className="market-nation-detail-c">
                    <span className="market-nation-name-c pointer">{row.nation}</span>
                    <div className="market-nation-book-c"></div>
                  </div>
                  <div className={`market-row-c ${row.suspended ? 'suspended-row' : ''}`} data-title={row.suspended ? "SUSPENDED" : "ACTIVE"} key={index}>
                  <div className="market-odd-box-c lay">
                    <span className="market-odd-c">{row.layOdd}</span>
                  </div>
                  <div className="market-odd-box-c back">
                    <span className="market-odd-c">{row.backOdd}</span>
                  </div>
                  <div className="fancy-min-max-box">
                    <div className="fancy-min-max">
                      <span className="w-100 d-block">Min: 100.00</span>
                      <span className="w-100 d-block">Max: 1L</span>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};



export default MarketComponent;