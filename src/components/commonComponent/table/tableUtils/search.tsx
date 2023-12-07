import React from "react";
import isMobile from "../../../../utils/screenDimension";
import CustomInput from "../../input";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  value: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, value }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onSearch(query);
  };

  return (
    <CustomInput
      title="Search:"
      value={value}
      type="text"
      onChange={handleSearchChange}
      placeholder="Type your search"
      inputClass={`${
        isMobile ?
        "p-0 title-10"
:"p-1"      }`}
      customStyle={`${isMobile?"flex-column":"flex-row align-items-center"} `}
      isUnderlinedInput={isMobile}
    />
  );
};

export default SearchBox;
