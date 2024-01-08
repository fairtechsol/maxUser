import moment from "moment";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { searchListReset } from "../../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../../store/store";
import "./style.scss";

const SearchResult = ({ data, setOpen }: any) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className="position-absolute bg-white text-black p-2 search-result">
      {data?.length == 0 ? (
        <p className="text-center">No real-time records found</p>
      ) : (
        data?.map((item: any, index: number) => (
          <Link
            onClick={() => {
              dispatch(searchListReset());
              setOpen(false);
            }}
            className="text-decoration-none"
            to={`/game-detail/${item?.id}`}
          >
            <div key={index} className="d-flex flex-column w-100 border-bottom">
              <div className="d-flex justify-content-between align-items-center">
                <div className="f700 title-16 text-capitalize">
                  {item?.matchType}
                </div>
                <div className="title-14">
                  {moment(item?.startAt).format("MM/DD/YYYY hh:mm:ss A")}
                </div>
              </div>
              <div className="title-14">{item?.title}</div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default SearchResult;
