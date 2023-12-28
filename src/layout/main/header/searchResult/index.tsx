import "./style.scss";
import moment from "moment"

const SearchResult = ({getMatchListBySearch}: any) => {
  
  return (
    <div className="position-absolute top-100 z-3 bg-white text-black p-2 search-result">
      {getMatchListBySearch.length > 0 ? getMatchListBySearch?.map((item: any, index: number) => (
        <div key={index} className="d-flex flex-column w-100 border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <div className="f700 title-16">{item?.matchType}</div>
            <div className="title-14">{moment(item?.startAt).format("DD/MM/YYYY")} {moment(item?.startAt).format("HH:mm:ss A")}</div>
          </div>
          <div className="title-14">{item?.competitionName}</div>
        </div>
      )) : <p>No real-time records found</p>}
    </div>
  );
};

export default SearchResult;
