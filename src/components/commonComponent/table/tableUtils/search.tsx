import { debounce } from "lodash";
import React, { useMemo, useState } from "react";
import {isMobile} from "../../../../utils/screenDimension";
import CustomInput from "../../input";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  value: string;
  placeHolder?:any;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch,placeHolder }) => {
  const [keyword, setKeyword] = useState("");

  const debouncedInputValue = useMemo(() => {
    return debounce((value:any) => {
      onSearch(value);
    }, 500);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setKeyword(query);
    debouncedInputValue(query);
  };

  return (
    <CustomInput
      title="Search:"
      value={keyword}
      type="text"
      onChange={handleSearchChange}
      placeholder={placeHolder ?? "Type your search"}
      inputClass={`${isMobile ? "px-1 p-0 title-10" : "p-1"}`}
      customStyle={`${
        isMobile ? "flex-row mt-1" : "flex-row align-items-center"
      } `}
      isUnderlinedInput={isMobile}
    />
  );
};

export default SearchBox;
