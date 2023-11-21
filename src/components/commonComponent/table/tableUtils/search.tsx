import React from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";

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
    <Form.Group
      controlId="searchBox"
      className="mb-3 d-flex align-items-center"
    >
      <Form.Label className="mb-0">Search:</Form.Label>
      <InputGroup>
        <FormControl
          value={value}
          type="text"
          placeholder=""
          onChange={handleSearchChange}
        />
      </InputGroup>
    </Form.Group>
  );
};

export default SearchBox;
