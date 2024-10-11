import { debounce } from "lodash";
import { useMemo, useState } from "react";
import { FaSearchPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getMatchListSearch } from "../../../../../store/actions/match/matchListAction";
import { AppDispatch, RootState } from "../../../../../store/store";
import SearchResult from "../../searchResult";
import "./style.scss";

const SearchBox = () => {
  const [searchIco, setSearchIco] = useState(false);
  const [searchValue,setSearchValue] = useState("")

  const { searchedMatchList } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const searchIcoHandle = () => {
    setSearchIco(!searchIco);
  };
  const dispatch: AppDispatch = useDispatch();

  const debouncedInputValue = useMemo(() => {
    return debounce((value:any) => {
      dispatch(
        getMatchListSearch({
          type: "search",
          searchKeyword: value,
        })
      );
    }, 500);
  }, []);
  
  return (
    <div className={`search-box  ${searchIco ? "searchIcoActive" : ""} `}>
      {/* <div className={`position-relative`}> */}
      <input
        type="text"
        onChange={(e: any) => {
          setSearchValue(e.target.value)
          if (e.target.value?.length > 2) {
            debouncedInputValue(e.target.value);
          }
        }}
      />
      {searchIco && searchedMatchList && searchValue?.length>0 && (
        <SearchResult setOpen={setSearchIco} data={searchedMatchList} />
      )}

      <div className="search-icon" onClick={searchIcoHandle}>
        {searchIco ? <IoClose style={{color: "black"}} /> : <FaSearchPlus/>}
      </div>
      {/* </div> */}

      {/* <div className="search-icon" onClick={searchIcoHandle}></div> */}
    </div>
  );
};

export default SearchBox;
