import { debounce } from "lodash";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { SearchList } from "../../../store/actions/match/matchListAction";
import { AppDispatch } from "../../../store/store";

const SearchInput = (props: any) => {
  const {
    onChange,
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
