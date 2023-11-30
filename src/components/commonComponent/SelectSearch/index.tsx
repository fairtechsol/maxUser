import { Form } from "react-bootstrap";
import Select from "react-select";
import CustomErrorMessage from "../customErrorMessage";
import "./style.scss";

const SelectSearch = (props: any) => {
  const {
    id,
    options,
    placeholder,
    isMultiOption,
    isSearchable,
    onChange,
    value,
    defaultValue,
    label,
    customClass,
    filedClass,
    SelectInline,
    onBlur,
    touched,
    errors,
  } = props;

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: "30px", // Adjust the minHeight to your desired height
    }),
    menu: (provided: any) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,
    }),
  };

  return (
    <>
      <Form.Group
        className={`customSelect ${SelectInline ? "SelectInline" : ""} ${
          customClass ?? ""
        }`}
      >
        {label ? <Form.Label>{label}</Form.Label> : ""}
        <Select
          id={id}
          styles={customStyles}
          className={`selectSearch ${filedClass}`}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          options={options}
          placeholder={placeholder}
          isMulti={isMultiOption}
          isSearchable={isMultiOption === undefined ? false : isSearchable}
        />
        <CustomErrorMessage touched={touched} errors={errors} />
      </Form.Group>
    </>
  );
};

export default SelectSearch;
