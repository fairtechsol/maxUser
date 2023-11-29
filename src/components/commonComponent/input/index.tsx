import { Form } from "react-bootstrap";
import isMobile from "../../../utils/screenDimension";
import CustomErrorMessage from "../customErrorMessage";
import "./style.scss";
interface SelectItem {
  value: string;
  name: string;
}

const CustomInput = (props: any) => {
  const {
    title,
    formInline,
    labelCol,
    inputCol,
    bgColor,
    errors,
    id,
    touched,
    inputClass,
    type,
    options,
    customStyle,
    isUnderlinedInput,
    ...prop
  } = props;
  return (
    <>
      <Form.Group className={`${customStyle??""} d-flex gap-1`}>
        {title ? (
          <Form.Label className={`${isMobile&&"title-12"} mb-0`}>
            {title}
          </Form.Label>
        ) : (
          ""
        )}
        {type === "select" ? (
          <Form.Select
            className={`${
              inputClass ?? ""
            } bg-${bgColor} ${isUnderlinedInput&&"underline-textbox"}`}
            name={id}
            {...prop}
          >
            {options?.map((item: SelectItem) => (
              <option key={item?.value} value={item?.value}>{item?.name}</option>
            ))}
          </Form.Select>
        ) : (
          <Form.Control
            className={` ${
              inputClass ?? ""
            } bg-${bgColor} ${isUnderlinedInput&&"underline-textbox"}`}
            name={id}
            type={type}
            {...prop}
          />
        )}
        <CustomErrorMessage touched={touched} errors={errors} />
      </Form.Group>
    </>
  );
};

export default CustomInput;
