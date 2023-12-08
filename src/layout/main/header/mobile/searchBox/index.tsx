import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import "./style.scss";

const SearchBox = () => {
  const [searchIco, setSearchIco] = useState(false);

  const searchIcoHandle = () => {
    // alert("dekd");
    setSearchIco(!searchIco);
  };
  return (
    <div className={`search-box  ${searchIco ? "searchIcoActive" : ""} `}>
      {/* <div className={`position-relative`}> */}
      <input type="text" />
      <div className="search-icon" onClick={searchIcoHandle}>
        {searchIco ? <IoClose /> : <FaSearch />}
      </div>
      {/* </div> */}

      {/* <div className="search-icon" onClick={searchIcoHandle}></div> */}
    </div>
  );
};

export default SearchBox;
