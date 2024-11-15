import moment from "moment";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { searchListReset } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import "./style.scss";
// import { useEffect } from "react";

const SearchResult = ({ data, setOpen }: any) => {
  const dispatch: AppDispatch = useDispatch();

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === 'Backspace') {
  //       // Close the search result
  //       setOpen(false);
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [setOpen]);
  return (
    <div className="position-absolute bg-white text-black p-1 search-result" >
      {data?.length == 0 ? (
        <p className="text-start pt-1">No real-time records found</p>
      ) : (
        data?.map((item: any, index: number) => (
          <Link
            onClick={() => {
              dispatch(searchListReset());
              setOpen(false);
            }}
            className="text-decoration-none"
            to={item?.matchType==="greyHound" || item?.matchType==="horseRacing"?`/race/${item?.id}`:`/game-detail/${item.matchType}/${item?.id}`}
            key={index}
          >
            <div className="d-flex flex-column w-100 border-bottom">
              <div className="d-flex justify-content-between align-items-center">
                <div className="f700 title-16 text-capitalize font-color">
                  {item?.matchType}
                </div>
                <div className="title-14 font-color">
                  {moment(item?.startAt).format("MM/DD/YYYY hh:mm:ss A")}
                </div>
              </div>
              <div className="title-15 font-color">{item?.title}</div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default SearchResult;
