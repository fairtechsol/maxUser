import { Form } from "react-bootstrap";
import "./style.scss";

const CustomInput = (props: any) => {
  const { title, formInline, labelCol, inputCol, inputIcon, ...prop } = props;
  return (
    <>
      <Form.Group
        className={`${props.customStyle} ${
          formInline ? "row" : ""
        } position-relative`}
        controlId="cityName w-100"
      >
        {title ? (
          <Form.Label className={`col-${formInline ? labelCol : ""}`}>
            {title}
          </Form.Label>
        ) : (
          ""
        )}
        <Form.Control
          className={`col-${formInline ? inputCol : ""}`}
          {...prop}
        />
        <div className="input-icon">{inputIcon}</div>
      </Form.Group>
    </>
  );
};

export default CustomInput;
