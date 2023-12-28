import { TextField, useMediaQuery, useTheme } from "@mui/material";


// import { SEARCH, Search } from "../../assets";
import { debounce } from "lodash";
import { SearchList } from "../../../store/actions/match/matchListAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { Form } from "react-bootstrap";
import { useState } from "react";

const SearchInput = (props: any) => {
  const {
    placeholder,
    inputContainerStyle,
    showTextInput,
    header,
    setShowSearch,
    show,
    width,
    searchContainerStyle,
    onChange,
    endpoint,
  } = props;

  const dispatch: AppDispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("")

  const handleInputChange = debounce(async (event: any) => {
    const value = event.target.value;
    if (onChange && typeof onChange === "function") {
      onChange(value);
      setInputValue(value)
    }
    try {
      dispatch(
        SearchList({
          title: value
        })
      );
    } catch (e) {
      console.log(e);
    }
  }, 500);

  return (
    <>
      <Form>
        <Form.Group controlId="searchMatch">
          <Form.Control type="text" placeholder="All Events.."
            value={inputValue}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default SearchInput;
